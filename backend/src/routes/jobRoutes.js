const express = require("express");
const router = express.Router();

router.post("/");           //create job, client only
router.get("/");            //get all jobs
router.get("/:id");         //get job by id
router.put("/:id");         //update job by id, client only
router.delete("/:id");      //delete job by id, client, admin only
router.post("/:id/apply");  //apply to job by id, freelancer only
router.get("/:id/proposals");       //get proposals for job by id, client only
router.put(":id/assign");  //assign freelancer to job by id, client only

module.exports = router;