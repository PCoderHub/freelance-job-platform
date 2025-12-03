import {
  Box,
  Typography,
  Avatar,
  Chip,
  Divider,
  Grid,
  Rating,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function ProposalView() {
  const proposal = useSelector((state) => state.proposal.proposal);
  const freelancer = proposal.freelancer;

  return (
    <Box sx={{}}>
      <Paper elevation={4}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 3,
            background: "linear-gradient(135deg,#4f46e5,#6366f1)",
            color: "white",
          }}
        >
          <Avatar
            src={freelancer?.profileImage}
            sx={{
              width: 70,
              height: 70,
              fontSize: 28,
              bgcolor: "white",
              color: "#4f46e5",
            }}
          >
            {freelancer?.name?.charAt(0)}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              {freelancer?.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {freelancer?.profile?.title}
            </Typography>
          </Box>
        </Box>

        {/* BODY CONTENT */}
        <Box sx={{ p: 3 }}>
          {/* FREELANCER INFO */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Freelancer Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Hourly Rate
              </Typography>
              <Typography variant="body1" fontWeight="600">
                ${freelancer?.freelancerProfile?.hourlyRate}/hr
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Rating
              </Typography>
              <Rating value={freelancer?.rating} precision={0.5} readOnly />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Skills
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                {freelancer?.freelancerProfile?.skills?.map((skill, idx) => (
                  <Chip
                    label={skill}
                    key={idx}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* BID DETAILS */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Proposal Details
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Bid Amount
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            ${proposal.bidAmount}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Cover Letter
          </Typography>
          <Box
            sx={{
              mt: 1,
              p: 2,
              background: "#f9fafb",
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              whiteSpace: "pre-line",
              lineHeight: 1.6,
            }}
          >
            {proposal.coverLetter}
          </Box>

          <Divider sx={{ my: 3 }} />
        </Box>
      </Paper>
    </Box>
  );
}
