import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { useDispatch } from "react-redux";
import { setJob } from "../features/job/jobSlice";
import Modal from "./Modal";
import JobDetails from "../pages/JobDetails";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProposalForm from "./ProposalForm";
import JobView from "./JobView";

const ITEM_HEIGHT = 48;

function JobCard({ job }) {
  const [openModal, setOpenModal] = useState(false);
  const [openProposalModal, setOpenProposalModal] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleJobDetails = () => {
    dispatch(setJob(job));
    setOpenModal(true);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmitProposal = () => {
    setAnchorEl(null);
    setOpenProposalModal(true);
  };

  return (
    <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Avatar src={job?.client?.profile?.profilePic}>
            {job?.client?.name?.charAt(0)}
          </Avatar>
        }
        action={
          <div>
            <IconButton accessKey="" onClick={handleMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
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
                key={"Submit Proposal"}
                onClick={handleSubmitProposal}
              >
                <span accessKey="">Submit Proposal</span>
              </MenuItem>
            </Menu>
          </div>
        }
        title={job?.client?.name}
        subheader={new Date(job?.updatedAt).toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      />

      <Divider />

      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={1}>
          {job?.title}
        </Typography>

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
          accessKey=""
          variant="contained"
          size="small"
          onClick={handleJobDetails}
        >
          View Details
        </Button>
      </CardActions>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <JobView job={job} />
      </Modal>
      <Modal
        open={openProposalModal}
        onClose={() => setOpenProposalModal(false)}
      >
        <ProposalForm
          jobId={job._id}
          onClose={() => setOpenProposalModal(false)}
        />
      </Modal>
    </Card>
  );
}

export default JobCard;
