const express = require("express");
const router = express.Router();

router.post("/register");       //register client/freelancer
router.post("/login");          //user login
router.post("/logout");         //user logout
router.get("/my-profile");      //logged in user profile
router.put("/update-profile");  //update user profile
router.put("/change-password"); //change user password

module.exports = router;