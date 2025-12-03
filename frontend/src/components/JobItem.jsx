import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

import React from "react";

function JobItem({ job }) {
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
    </Card>
  );
}

export default JobItem;
