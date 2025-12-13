import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  Tooltip,
} from "@mui/material";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setJob } from "../features/job/jobSlice";
import Modal from "./Modal";
import JobView from "./JobView";
import { acceptOffer, declineOffer } from "../services/freelancerServices";
import { toast } from "react-toastify";
import ReviewForm from "./ReviewForm";
import { createReview } from "../services/reviewServices";

function JobItem({ proposal, job, actions }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [openReviewModal, setOpenReviewModal] = useState(false);

  const confirmJobView = () => {
    dispatch(setJob(job));
    setOpenModal(true);
  };

  const handleAcceptOffer = async () => {
    try {
      const res = await acceptOffer(proposal._id);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeclineOffer = async () => {
    try {
      const res = await declineOffer(proposal._id);
      toast.success(res.data.message);
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
        reviewedId: job.client._id,
        rating,
        comment,
      };

      const response = await createReview(review);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card
      elevation={2}
      sx={{ mb: 2, p: 2, borderRadius: 2, cursor: "pointer" }}
    >
      <Typography variant="h6" fontWeight={600}>
        {job.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {job.category} • {job.duration}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        <Tooltip title={proposal.coverLetter}>{proposal.coverLetter}</Tooltip>
      </Typography>

      {/* <Stack direction="row" spacing={1} sx={{ my: 1 }} flexWrap="wrap">
        <Chip label={`₹${job.budget}`} color="success" />
        {job.skillsRequired?.map((skill, i) => (
          <Chip key={i} label={skill} size="small" color="primary" />
        ))}
      </Stack> */}

      <Typography variant="body2" color="text.secondary">
        Application Status:{" "}
        <b
          className={
            proposal.status === "accepted" ? "text-green-500" : "text-red-500"
          }
        >
          {proposal.status}
        </b>
      </Typography>
      {job?.status === "completed" && (
        <Typography variant="body2" color="text.secondary">
          Job Status: <b>{job?.status}</b>
        </Typography>
      )}

      <Button
        accessKey=""
        variant="contained"
        size="small"
        sx={{ mt: 1 }}
        onClick={confirmJobView}
      >
        <span accessKey="">View Job</span>
      </Button>
      {job?.status === "completed" && proposal?.status === "accepted" && (
        <Button
          accessKey=""
          variant="contained"
          size="small"
          sx={{ mt: 1, ml: 1 }}
          onClick={() => setOpenReviewModal(true)}
        >
          <span accessKey="">Leave a review</span>
        </Button>
      )}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <JobView job={job} />
      </Modal>
      <Modal open={openReviewModal} onClose={() => setOpenReviewModal(false)}>
        <ReviewForm onSubmit={handleReviewSubmit} />
      </Modal>
      {actions && (
        <>
          <Button
            accessKey=""
            variant="contained"
            size="small"
            sx={{ mt: 1, ml: 1 }}
            onClick={handleAcceptOffer}
          >
            <span accessKey="">Accept</span>
          </Button>
          <Button
            accessKey=""
            variant="contained"
            size="small"
            sx={{ mt: 1, ml: 1 }}
            onClick={handleDeclineOffer}
          >
            <span accessKey="">Decline</span>
          </Button>
        </>
      )}
    </Card>
  );
}

export default JobItem;
