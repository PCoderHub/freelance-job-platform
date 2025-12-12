import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {
  deleteJob,
  getJobById,
  getJobProposals,
  offerToFreelancer,
  updateJob,
} from "../services/jobServices";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Modal from "../components/Modal";
import ProposalView from "../components/ProposalView";
import { useDispatch } from "react-redux";
import { setProposal } from "../features/proposal/proposalSlice";
import { toast } from "react-toastify";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReviewForm from "../components/ReviewForm";
import { createReview } from "../services/reviewServices";

const ITEM_HEIGHT = 48;

function JobDetails() {
  //const jobData = useSelector((state) => state.job.job);
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  //const user = JSON.parse(localStorage.getItem("user"));
  const [openReviewModal, setOpenReviewModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelJob = async () => {
    setAnchorEl(null);
    try {
      const response = await updateJob(job._id, { status: "cancelled" });
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleMarkAsCompleted = async () => {
    setAnchorEl(null);
    try {
      const response = await updateJob(job._id, { status: "completed" });
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async () => {
    setAnchorEl(null);
    try {
      const response = await deleteJob(job._id);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getJobDetails = async (id) => {
      try {
        const res = await getJobById(id);
        const res2 = await getJobProposals(id);
        setJob({
          ...res.data,
          proposals: res2.data,
        });
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };

    getJobDetails(id);
  }, [id]);

  const viewProposal = (proposal) => {
    dispatch(setProposal(proposal));
    setOpen(true);
  };

  const offerJob = async (proposalId) => {
    try {
      const res = await offerToFreelancer(id, proposalId);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      const review = {
        jobId: job._id,
        reviewedId: job.freelancer._id,
        rating,
        comment,
      };

      const response = await createReview(review);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
        mt: 5,
        p: 3,
      }}
    >
      <Button
        accessKey=""
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        <span accessKey="">Go Back</span>
      </Button>
      {/* MAIN JOB SECTION */}
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="bold">
              {job.title}
            </Typography>
          }
          subheader={`Posted on ${new Date(job.createdAt).toLocaleDateString(
            "en-US",
            { day: "numeric", month: "long", year: "numeric" }
          )}`}
          action={
            <div>
              <IconButton accessKey="" onClick={handleMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  },
                  list: {
                    "aria-labelledby": "long-button",
                  },
                }}
              >
                <MenuItem
                  accessKey=""
                  key={"Cancel Job"}
                  onClick={handleCancelJob}
                >
                  <span accessKey="">Cancel Job</span>
                </MenuItem>
                {job?.status !== "completed" && (
                  <MenuItem
                    accessKey=""
                    key={"Mark as Completed"}
                    onClick={handleMarkAsCompleted}
                  >
                    <span accessKey="">Mark as Completed</span>
                  </MenuItem>
                )}
                <MenuItem
                  accessKey=""
                  key={"Delete Job"}
                  onClick={handleDeleteJob}
                >
                  <span accessKey="">Delete Job</span>
                </MenuItem>
                {job?.status === "completed" && (
                  <MenuItem
                    accessKey=""
                    key={"Leave a review"}
                    onClick={() => setOpenReviewModal(true)}
                  >
                    <span accessKey="">Leave a review</span>
                  </MenuItem>
                )}
                <Modal
                  open={openReviewModal}
                  onClose={() => setOpenReviewModal(false)}
                >
                  <ReviewForm onSubmit={handleReviewSubmit} />
                </Modal>
              </Menu>
            </div>
          }
        />

        <Divider />

        <CardContent>
          {/* Job Info Chips */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ my: 2 }}
            useFlexGap
            flexWrap="wrap"
          >
            <Chip
              icon={<WorkIcon />}
              label={job.category}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<MonetizationOnIcon />}
              label={`Budget: £${job.budget}`}
              color="success"
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={job.duration}
              color="secondary"
              variant="outlined"
            />
            <Chip label={job.status} color="warning" variant="outlined" />
          </Stack>

          {/* Description */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Description
            </Typography>
            <Typography
              sx={{ mt: 1, color: "text.secondary", lineHeight: 1.8 }}
            >
              {job.description}
            </Typography>
          </Box>

          {/* Skills */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={600}>
              Skills Required
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {job.skillsRequired?.map((skill, i) => (
                <Chip
                  key={i}
                  label={skill}
                  color="info"
                  variant="filled"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* CLIENT DETAILS */}
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          About the Client
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={job.client?.profile?.profilePic}
            sx={{ width: 50, height: 50 }}
          />
          <Box>
            <Typography fontWeight="bold">{job.client?.name}</Typography>
            <Typography fontSize={14} color="text.secondary">
              {job.client?.profile?.title || "Client"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 1 }}>
          {job.client?.clientProfile?.companyName && (
            <Typography sx={{ mb: 0.5 }}>
              <strong>Company:</strong> {job.client.clientProfile.companyName}
            </Typography>
          )}
          {job.client?.clientProfile?.companyWebsite && (
            <Typography sx={{ mb: 0.5 }}>
              <strong>Website:</strong>{" "}
              <a
                accessKey=""
                href={job.client.clientProfile.companyWebsite}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#1e40af" }}
              >
                {job.client.clientProfile.companyWebsite}
              </a>
            </Typography>
          )}
          {job.client?.clientProfile?.industry && (
            <Typography sx={{ mb: 0.5 }}>
              <strong>Industry:</strong> {job.client.clientProfile.industry}
            </Typography>
          )}
          {job.client?.clientProfile?.description && (
            <Typography sx={{ mb: 0.5 }}>
              <strong>About:</strong> {job.client.clientProfile.description}
            </Typography>
          )}
          {job.client?.clientProfile?.hiringBudget && (
            <Typography sx={{ mb: 0.5 }}>
              <strong>Hiring Budget:</strong> £
              {job.client.clientProfile.hiringBudget}
            </Typography>
          )}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Proposals Received ({job?.proposals?.length})
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {job?.proposals?.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 3 }}
          >
            No proposals received yet.
          </Typography>
        ) : (
          <List>
            {job?.proposals?.map((proposal) => (
              <ListItem
                key={proposal._id}
                sx={{
                  borderBottom: "1px solid #eee",
                  py: 2,
                  alignItems: "flex-start",
                }}
              >
                <ListItemAvatar>
                  <Avatar>{proposal.freelancer?.name?.charAt(0)}</Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {proposal.freelancer?.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {proposal.coverLetter}
                      </Typography>

                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ mt: 1 }}
                      >
                        Bid Amount: ${proposal.bidAmount}
                      </Typography>

                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ mt: 1 }}
                      >
                        Proposal Status: {proposal.status}
                      </Typography>
                    </>
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    accessKey=""
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => viewProposal(proposal)}
                  >
                    View Proposal
                  </Button>
                  {proposal.status === "pending" && (
                    <Button
                      accessKey=""
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => offerJob(proposal._id)}
                    >
                      Offer
                    </Button>
                  )}
                </Box>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <ProposalView />
                </Modal>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}

export default JobDetails;
