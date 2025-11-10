const express = require("express");
const router = express.Router();

router.get("/");            //get all freelnacers for client/admin
router.get("/:id");         //get freelancer by id
router.put("/update-profile")   //update freelancer profile
router.get("/my-jobs");     //get freelancer jobs applied to or hired for
router.get("/my-proposals");   //get proposals submitted by freelancer

module.exports = router;