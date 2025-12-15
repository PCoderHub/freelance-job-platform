import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Chip,
  Rating,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { logoutUser } from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  deleteJob,
  deleteUser,
  getAllJobs,
  getAllReviews,
  getAllUsers,
  getDashboardStats,
  updateUserStatus,
} from "../services/adminServices";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTransactions } from "../services/paymentServices";

const Sidebar = ({ selected, setSelected, onClose }) => {
  const menu = ["Dashboard", "Users", "Jobs", "Payments", "Reviews"];
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error.message || error.response.data.message);
    }
  };

  return (
    <Box sx={{ height: "100%", width: 250 }}>
      <List>
        {menu.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              selected={selected === item}
              onClick={() => {
                setSelected(item);
                onClose?.();
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <Button fullWidth onClick={handleLogout} color="error">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        console.info(res.data);
        setJobs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const res = await deleteJob(jobId);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>
              <b>Title</b>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              <b>Category</b>
            </TableCell>
            <TableCell>
              <b>Client</b>
            </TableCell>
            <TableCell>
              <b>Freelancer</b>
            </TableCell>
            <TableCell>
              <b>Budget</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              <b>Skills</b>
            </TableCell>
            <TableCell>
              <b>Proposals</b>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              <b>Created</b>
            </TableCell>
            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id} hover>
              {/* Job Title */}
              <TableCell>{job.title}</TableCell>

              {/* Category */}
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                {job.category}
              </TableCell>

              {/* Client */}
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar
                    src={job.client?.profile?.profilePic}
                    alt={job.client?.name}
                    sx={{ width: 32, height: 32 }}
                  />
                  <div>
                    <div>{job.client?.name}</div>
                    <small style={{ color: "#666" }}>{job.client?.email}</small>
                  </div>
                </div>
              </TableCell>

              {/* Freelancer */}
              <TableCell>
                {job.freelancer ? (
                  <>
                    <div>{job.freelancer.name}</div>
                    <small style={{ color: "#666" }}>
                      {job.freelancer.email}
                    </small>
                  </>
                ) : (
                  "—"
                )}
              </TableCell>

              {/* Budget */}
              <TableCell>₹{job.budget}</TableCell>

              {/* Status */}
              <TableCell>
                <Chip
                  label={job.status}
                  color={
                    job.status === "completed"
                      ? "success"
                      : job.status === "in-progress"
                      ? "warning"
                      : "default"
                  }
                  size="small"
                />
              </TableCell>

              {/* Skills */}
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                {job.skillsRequired?.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.trim()}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </TableCell>

              {/* Proposals */}
              <TableCell>{job.proposals?.length || 0}</TableCell>

              {/* Created At */}
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(job._id)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await getDashboardStats();
        console.info(res.data);
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Jobs</Typography>
            <Typography variant="h4">{stats.totalJobs}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Reviews</Typography>
            <Typography variant="h4">{stats.totalReviews}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{stats.totalUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAllUsers();
        console.info(res.data);
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleStatusUpdate = async (userId, isActive) => {
    try {
      const res = await updateUserStatus(userId, !isActive);
      console.info(res.data);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDelete = async (userId) => {
    try {
      const res = await deleteUser(userId);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              {/* USER */}
              <TableCell>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar src={user.profile?.profilePic} />
                  <div>
                    <strong>{user.name}</strong>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {user.profile?.title}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* EMAIL */}
              <TableCell>{user.email}</TableCell>

              {/* ROLE */}
              <TableCell>
                <Chip
                  label={user.role}
                  color={user.role === "freelancer" ? "primary" : "secondary"}
                />
              </TableCell>

              {/* ROLE-SPECIFIC DETAILS */}
              <TableCell>
                {user.role === "freelancer" && user.freelancerProfile && (
                  <>
                    <div>
                      <strong>Skills:</strong>{" "}
                      {user.freelancerProfile.skills?.join(", ") || "—"}
                    </div>
                    <div>
                      <strong>Rate:</strong> ₹
                      {user.freelancerProfile.hourlyRate || "—"}/hr
                    </div>
                    <div>
                      <strong>Availability:</strong>{" "}
                      {user.freelancerProfile.availability || "—"}
                    </div>
                  </>
                )}

                {user.role === "client" && user.clientProfile && (
                  <>
                    <div>
                      <strong>Company:</strong> {user.clientProfile.companyName}
                    </div>
                    <div>
                      <strong>Industry:</strong> {user.clientProfile.industry}
                    </div>
                    <div>
                      <strong>Budget:</strong> ₹
                      {user.clientProfile.hiringBudget}
                    </div>
                  </>
                )}
              </TableCell>

              {/* STATUS */}
              <TableCell>
                <Chip
                  label={user.isActive ? "Active" : "Inactive"}
                  color={user.isActive ? "success" : "default"}
                />
              </TableCell>

              {/* CREATED */}
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>

              {/* ACTIONS */}
              {user?.role !== "admin" && (
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleStatusUpdate(user._id, user.isActive)}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(user._id)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getTransactions();
        setPayments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!payments.length) {
    return <Typography color="text.secondary">No payments found</Typography>;
  }
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Client</b>
            </TableCell>
            <TableCell>
              <b>Freelancer</b>
            </TableCell>
            <TableCell>
              <b>Amount</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>
              <b>Date</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {payments.map((p) => (
            <TableRow key={p._id} hover>
              <TableCell>{p.client?.name}</TableCell>
              <TableCell>{p.freelancer?.name}</TableCell>
              <TableCell>£{(p.amount / 100).toFixed(2)}</TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell>
                {new Date(p.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await getAllReviews();
        console.info(response.data);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllReviews();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>
              <b>Rating</b>
            </TableCell>
            <TableCell>
              <b>Comment</b>
            </TableCell>
            <TableCell>
              <b>Job</b>
            </TableCell>
            <TableCell>
              <b>Reviewer</b>
            </TableCell>
            <TableCell>
              <b>Reviewed User</b>
            </TableCell>
            <TableCell>
              <b>Created</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review._id} hover>
              {/* Rating */}
              <TableCell>
                <Rating value={review.rating} readOnly size="small" />
              </TableCell>

              {/* Comment */}
              <TableCell style={{ maxWidth: 300 }}>
                <Tooltip title={review.comment}>
                  <span>
                    {review.comment.length > 60
                      ? `${review.comment.slice(0, 60)}...`
                      : review.comment}
                  </span>
                </Tooltip>
              </TableCell>

              {/* Job */}
              <TableCell>{review.job?.title || "—"}</TableCell>

              {/* Reviewer */}
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar
                    src={review.reviewer?.profile?.profilePic}
                    alt={review.reviewer?.name}
                    sx={{ width: 32, height: 32 }}
                  />
                  <div>
                    <div>{review.reviewer?.name}</div>
                    <small style={{ color: "#666" }}>
                      {review.reviewer?.email}
                    </small>
                  </div>
                </div>
              </TableCell>

              {/* Reviewed User */}
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar
                    src={review.reviewed?.profile?.profilePic}
                    alt={review.reviewed?.name}
                    sx={{ width: 32, height: 32 }}
                  />
                  <div>
                    <div>{review.reviewed?.name}</div>
                    <small style={{ color: "#666" }}>
                      {review.reviewed?.email}
                    </small>
                  </div>
                </div>
              </TableCell>

              {/* Created At */}
              <TableCell>
                {new Date(review.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function AdminDashboard() {
  const [selected, setSelected] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:900px)");
  const drawerWidth = 240;

  const renderPage = () => {
    switch (selected) {
      case "Users":
        return <Users />;
      case "Jobs":
        return <Jobs />;
      case "Payments":
        return <Payments />;
      case "Reviews":
        return <Reviews />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%", // 🔑 key
      }}
    >
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={!isMobile || mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            position: "relative",
            height: "100%",
          },
        }}
      >
        <Sidebar
          selected={selected}
          setSelected={setSelected}
          onClose={() => setMobileOpen(false)}
        />
      </Drawer>

      {/* Content */}
      <Box
        component="section"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(true)} sx={{ mb: 1 }}>
            <MenuIcon />
          </IconButton>
        )}

        {renderPage()}
      </Box>
    </Box>
  );
}
