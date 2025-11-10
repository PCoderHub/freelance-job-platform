const express = require("express");
const router = express.Router();

router.get("/");            //get all clients for admin
router.get("/:id");         //get client by id
router.put("update-profile");   //update client profile
router.get("/my-jobs");     //get jobs posted by client
router.get("/my-hires");   //get freelancers hired by client

module.exports = router;