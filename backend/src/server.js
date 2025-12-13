require("dotenv").config();
const express = require("express");
const { DBConnect } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");
const clientRoutes = require("./routes/clientRoutes");
const jobRoutes = require("./routes/jobRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const imageRoutes = require("./routes/imageRoutes");
const adminRoutes = require("./routes/adminRoutes");

DBConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/upload", imageRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
