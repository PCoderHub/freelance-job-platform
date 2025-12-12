import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteJob, updateJob } from "../services/jobServices";
import { toast } from "react-toastify";
import Modal from "./Modal";
import ReviewForm from "./ReviewForm";
import { createReview } from "../services/reviewServices";

const ITEM_HEIGHT = 48;

function JobPost({ job }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openReviewModal, setOpenReviewModal] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelJob = async () => {
    setAnchorEl(null);
    try {
      const response = await updateJob(job._id, { status: "cancelled" });
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleMarkAsCompleted = async () => {
    setAnchorEl(null);
    try {
      const response = await updateJob(job._id, { status: "completed" });
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      const review = {
        jobId: job._id,
        reviewedId: job.freelancer._id,
        rating,
        comment,
      };

      const response = await createReview(review);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async () => {
    setAnchorEl(null);
    try {
      const response = await deleteJob(job._id);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title={job?.title}
        subheader={new Date(job?.createdAt).toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        action={
          <div>
            <IconButton accessKey="" onClick={handleMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                },
                list: {
                  "aria-labelledby": "long-button",
                },
              }}
            >
              <MenuItem
                accessKey=""
                key={"Cancel Job"}
                onClick={handleCancelJob}
              >
                Cancel Job
              </MenuItem>
              {job?.status !== "completed" && (
                <MenuItem
                  accessKey=""
                  key={"Mark as Completed"}
                  onClick={handleMarkAsCompleted}
                >
                  Mark as Completed
                </MenuItem>
              )}
              <MenuItem
                accessKey=""
                key={"Delete Job"}
                onClick={handleDeleteJob}
              >
                Delete Job
              </MenuItem>
              {job?.status === "completed" && (
                <MenuItem
                  accessKey=""
                  key={"Leave a Review"}
                  onClick={() => setOpenReviewModal(true)}
                >
                  Leave a review
                </MenuItem>
              )}
              <Modal
                open={openReviewModal}
                onClose={() => setOpenReviewModal(false)}
              >
                <ReviewForm onSubmit={handleReviewSubmit} />
              </Modal>
            </Menu>
          </div>
        }
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ mb: 2 }}
        >
          <Chip label={job?.category} color="primary" variant="outlined" />
          <Chip
            label={`Budget: $${job?.budget}`}
            color="success"
            variant="outlined"
          />
          <Chip label={job?.duration} color="secondary" variant="outlined" />
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {job?.skillsRequired?.map((skill, i) => (
            <Chip key={i} label={skill} color="info" />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          accessKey=""
          variant="contained"
          size="small"
          onClick={() => navigate(`/home/client/jobs/${job?._id}`)}
        >
          <span accessKey="">View Details</span>
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobPost;
