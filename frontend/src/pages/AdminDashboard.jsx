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

const Sidebar = ({ selected, setSelected }) => {
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
    <aside className="bg-white w-1/5 p-4 min-h-screen p-4" tabIndex={-1}>
      <nav className="flex flex-col justify-between h-full">
        <List>
          {menu.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                selected={selected === item}
                onClick={() => setSelected(item)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <button
          accessKey=""
          tabIndex={-1}
          type="button"
          onClick={handleLogout}
          className="text-black font-bold"
        >
          <span accessKey="">Logout</span>
        </button>
      </nav>
    </aside>
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
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>
              <b>Title</b>
            </TableCell>
            <TableCell>
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
            <TableCell>
              <b>Skills</b>
            </TableCell>
            <TableCell>
              <b>Proposals</b>
            </TableCell>
            <TableCell>
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
              <TableCell>{job.category}</TableCell>

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
              <TableCell>
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
              <TableCell>
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
    <TableContainer component={Paper}>
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

const Payments = () => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Freelancer</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[1, 2].map((p) => (
          <TableRow key={p}>
            <TableCell>Free {p}</TableCell>
            <TableCell>$200</TableCell>
            <TableCell>2025-01-01</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

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
    <TableContainer component={Paper} sx={{ mt: 3 }}>
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
    <Box sx={{ display: "flex" }}>
      <Sidebar selected={selected} setSelected={setSelected} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderPage()}
      </Box>
    </Box>
  );
}
