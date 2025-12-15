import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  Rating,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  deleteReview,
  getGivenReviews,
  getReviews,
  updateReview,
} from "../services/reviewServices";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import ReviewForm from "../components/ReviewForm";
import Masonry from "@mui/lab/Masonry";

function ReviewsAndRatings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tab, setTab] = useState(0);
  const [received, setReceived] = useState([]);
  const [given, setGiven] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const resReceived = await getReviews(user?.id);
        console.log(resReceived.data);
        setReceived(resReceived.data);

        const resGiven = await getGivenReviews(user?.id);
        console.log(resGiven.data);
        setGiven(resGiven.data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    getUserReviews();
  }, [user.id]);

  const handleTabChange = (e, newVal) => {
    setTab(newVal);
  };

  const handleDelete = async (reviewId) => {
    try {
      const resp = await deleteReview(reviewId);
      toast.success(resp.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (review) => {
    setEditReview(review);
    setOpenModal(true);
  };

  const handleUpdate = async ({ rating, comment }) => {
    try {
      const response = await updateReview(editReview._id, { rating, comment });
      toast.success(response.data.message);
      setOpenModal(false);
      setEditReview(null);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const renderReview = (review, canEdit = false) => (
    <Box
      key={review._id}
      sx={{
        backgroundColor: "white",
        boxShadow: 2,
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: 2,
        height: "100%",
      }}
    >
      <div className="flex-grow">
        <Typography variant="h6">
          {review.reviewer?.name || review.reviewed?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {review.job?.title}
        </Typography>
        <Rating value={review.rating} readOnly />
        <Typography className="mt-2">{review.comment}</Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(review.createdAt).toLocaleDateString()}
        </Typography>
      </div>
      {canEdit && (
        <div className="flex flex-col gap-2 ml-4">
          <IconButton onClick={() => handleEdit(review)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(review._id)}>
            <Delete />
          </IconButton>
        </div>
      )}
    </Box>
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab label="Reviews Received" />
        <Tab label="Reviews Given" />
      </Tabs>

      <Box className="mt-4">
        {tab === 0 &&
          (received.length > 0 ? (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {received.map((r, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 6 }}>
                  {renderReview(r)}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No reviews received.</Typography>
          ))}
        {tab === 1 &&
          (given.length > 0 ? (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {given.map((r, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 6 }}>
                  {renderReview(r, true)}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No reviews given.</Typography>
          ))}
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ReviewForm
          onSubmit={handleUpdate}
          initialValues={{
            rating: editReview?.rating,
            comment: editReview?.comment,
          }}
        />
      </Modal>
    </div>
  );
}

export default ReviewsAndRatings;
