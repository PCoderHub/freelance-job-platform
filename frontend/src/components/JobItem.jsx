import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setJob } from "../features/job/jobSlice";
import Modal from "./Modal";
import JobView from "./JobView";
import { acceptOffer, declineOffer } from "../services/freelancerServices";
import { toast } from "react-toastify";

function JobItem({ proposal, job, actions }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

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
        {proposal.coverLetter}
      </Typography>

      {/* <Stack direction="row" spacing={1} sx={{ my: 1 }} flexWrap="wrap">
        <Chip label={`₹${job.budget}`} color="success" />
        {job.skillsRequired?.map((skill, i) => (
          <Chip key={i} label={skill} size="small" color="primary" />
        ))}
      </Stack> */}

      <Typography variant="body2" color="text.secondary">
        Application Status: <b>{proposal.status}</b>
      </Typography>

      <Button
        variant="contained"
        size="small"
        sx={{ mt: 1 }}
        onClick={confirmJobView}
      >
        View Job
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <JobView job={job} />
      </Modal>
      {actions && (
        <>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 1, ml: 1 }}
            onClick={handleAcceptOffer}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 1, ml: 1 }}
            onClick={handleDeclineOffer}
          >
            Decline
          </Button>
        </>
      )}
    </Card>
  );
}

export default JobItem;
