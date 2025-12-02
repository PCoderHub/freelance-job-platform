import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function JobPost({ job }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title={job?.title}
        subheader={new Date(job?.updatedAt).toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
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
          variant="contained"
          size="small"
          onClick={() => navigate(`/home/client/jobs/${job?._id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobPost;
