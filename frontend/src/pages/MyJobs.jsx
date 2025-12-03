import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getFreelancerJobs } from "../services/freelancerServices";
import JobItem from "../components/JobItem";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MyJobs() {
  const [value, setValue] = useState(0);
  const [jobs, setJobs] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const response = await getFreelancerJobs();
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAppliedJobs();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        mt: 3,
        p: 3,
      }}
    >
      <Paper>
        {/* Header */}
        <Box sx={{ p: 3, bgcolor: "#4f46e5", color: "white" }}>
          <Typography variant="h5" fontWeight={700}>
            My Job Activity
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
              },
            }}
          >
            <Tab label="Applied Jobs" {...a11yProps(0)} />
            <Tab label="Offered Jobs" {...a11yProps(1)} />
            <Tab label="Hired Jobs" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Panel Content */}
        <CustomTabPanel value={value} index={0}>
          {jobs?.appliedJobs?.length > 0 ? (
            jobs?.appliedJobs?.map((job) => <JobItem key={job._id} job={job} />)
          ) : (
            <p>No applied jobs</p>
          )}

          {/* Add your list component here */}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {jobs?.offeredJobs?.length > 0 ? (
            jobs?.offeredJobs?.map((job) => (
              <JobItem key={job._id} job={job} actions={true} />
            ))
          ) : (
            <p>No offered jobs</p>
          )}
          {/* Add your list component here */}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          {jobs?.hiredJobs?.length > 0 ? (
            jobs?.hiredJobs?.map((job) => <JobItem key={job._id} job={job} />)
          ) : (
            <p>No offered jobs</p>
          )}
          {/* Add your list component here */}
        </CustomTabPanel>
      </Paper>
    </Box>
  );
}

export default MyJobs;
