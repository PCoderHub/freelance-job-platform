const express = require("express");
const { getAllClients, getClientById, updateClientProfile, getClientJobs, getClientHires } = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRole = require("../middleware/validateRole");
const router = express.Router();

router.get("/", authMiddleware, validateRole("admin"), getAllClients);            //get all clients for admin
router.get("/:id", getClientById);         //get client by id
router.put("/update-profile", authMiddleware, validateRole("client"), updateClientProfile);   //update client profile
router.get("/my-jobs", authMiddleware, validateRole("client"), getClientJobs);     //get jobs posted by client
router.get("/my-hires", authMiddleware, validateRole("client"), getClientHires);   //get freelancers hired by client

module.exports = router;