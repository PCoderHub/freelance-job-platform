import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import DashboardStatCard from "../components/DashboardStatCard";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useState } from "react";
import { useEffect } from "react";
import { getDashboardStats } from "../services/freelancerServices";

function FreelancerDashboard() {
  // 🔸 Replace with API data later
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        console.info(res.data);
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
      {/* Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <DashboardStatCard
            label="Active Jobs"
            value={stats?.stats?.activeJobs}
            icon={<WorkIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardStatCard
            label="Completed Jobs"
            value={stats?.stats?.completedJobs}
            icon={<CheckCircleIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardStatCard
            label="Total Earnings"
            value={`Rs.${(stats?.stats?.totalEarnings / 100).toFixed(2)}`}
            icon={<AccountBalanceWalletIcon />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardStatCard
            label="Average Rating"
            value={
              stats?.stats?.averageRating
                ? `${stats?.stats?.averageRating.toFixed(1)} ⭐ (${
                    stats?.stats?.totalReviews
                  })`
                : "No reviews yet"
            }
            icon={<StarRateIcon />}
            color="#fbc02d"
          />
        </Grid>
      </Grid>

      {/* Recent Jobs */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Jobs
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats?.recentJobs &&
              stats?.recentJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={job.status}
                      color={job.status === "completed" ? "success" : "primary"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default FreelancerDashboard;
