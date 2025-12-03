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

function JobItem({ job, actions }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const confirmJobView = () => {
    dispatch(setJob(job));
    setOpenModal(true);
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

      <Stack direction="row" spacing={1} sx={{ my: 1 }} flexWrap="wrap">
        <Chip label={`₹${job.budget}`} color="success" />
        {job.skillsRequired?.map((skill, i) => (
          <Chip key={i} label={skill} size="small" color="primary" />
        ))}
      </Stack>

      <Typography variant="body2" color="text.secondary">
        Status: <b>{job.status}</b>
      </Typography>

      {actions && (
        <>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 1 }}
            onClick={confirmJobView}
          >
            View
          </Button>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <JobView job={job} />
          </Modal>
          <Button variant="contained" size="small" sx={{ mt: 1, ml: 1 }}>
            Accept
          </Button>
          <Button variant="contained" size="small" sx={{ mt: 1, ml: 1 }}>
            Decline
          </Button>
        </>
      )}
    </Card>
  );
}

export default JobItem;
