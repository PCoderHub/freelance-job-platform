import {
  Avatar,
  Box,
  Chip,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InfoIcon from "@mui/icons-material/Info";

function JobView({ job }) {
  return (
    <div>
      {/* TITLE */}
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "1.7rem", color: "#4f46e5" }}
      >
        {job?.title}
      </DialogTitle>

      <DialogContent sx={{ pb: 4 }}>
        {/* CLIENT INFO */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="600">
              {job?.client?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job?.client?.clientProfile?.companyName || "Individual Client"}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Stack spacing={1.2}>
              {/* INDUSTRY */}
              {job?.client?.clientProfile?.industry && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <BusinessIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Industry:</strong>{" "}
                    {job.client.clientProfile.industry}
                  </Typography>
                </Stack>
              )}

              {/* WEBSITE */}
              {job?.client?.clientProfile?.companyWebsite && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LanguageIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Website:</strong>{" "}
                    <Link
                      href={job.client.clientProfile.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      {job.client.clientProfile.companyWebsite}
                    </Link>
                  </Typography>
                </Stack>
              )}

              {/* HIRING BUDGET */}
              {job?.client?.clientProfile?.hiringBudget && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <MonetizationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Hiring Budget:</strong> ₹
                    {job.client.clientProfile.hiringBudget}
                  </Typography>
                </Stack>
              )}

              {/* DESCRIPTION */}
              {job?.client?.clientProfile?.description && (
                <Stack direction="row" alignItems="flex-start" spacing={1}>
                  <InfoIcon fontSize="small" color="action" />
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    <strong>About Company:</strong>{" "}
                    {job.client.clientProfile.description}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        </Paper>

        {/* JOB OVERVIEW */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Job Overview
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Budget
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              ₹{job.budget}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Category
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {job.category}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Required Skills
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
              {job.skillsRequired?.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* DESCRIPTION */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Job Description
        </Typography>
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.7,
            background: "#fafafa",
            p: 2,
            borderRadius: 2,
            border: "1px solid #eee",
            whiteSpace: "pre-line",
          }}
        >
          {job.description}
        </Typography>

        <Divider sx={{ my: 3 }} />
      </DialogContent>
    </div>
  );
}

export default JobView;
