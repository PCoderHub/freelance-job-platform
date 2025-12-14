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
import StarRateIcon from "@mui/icons-material/StarRate";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import DashboardStatCard from "../components/DashboardStatCard";
import { useState } from "react";
import { useEffect } from "react";
import { getDashboardStats } from "../services/clientServices";

function ClientDashboard() {
  // 🔸 Replace with real API data later
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
    <Box sx={{ p: 10 }}>
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
            label="Proposals Waiting"
            value={stats?.stats?.proposalsWaiting}
            icon={<AssignmentIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardStatCard
            label="Hires"
            value={stats?.stats?.hires}
            icon={<PersonIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardStatCard
            label="Payments (This Month)"
            value={`Rs.${(stats?.stats?.paymentsThisMonth / 100).toFixed(2)}`}
            icon={<PaymentsIcon />}
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

      {/* Recent Activity */}
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
              stats?.recentJobs?.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={job.status}
                      color="primary"
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

export default ClientDashboard;
