const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const userController = require("../controllers/users.js");
const user = require("../models/user.js");
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


router.route("/signup")
  // Render Signup Form
  .get(userController.renderSignupForm)

  // Signup Route
  .post(wrapAsync(userController.signup));

router.route("/login")
  // Render Login Form
  .get(userController.renderLoginForm)

  // Passport Authentication Login 
  .post(
  saveRedirectUrl,
  passport.authenticate("local",{ 
    failureRedirect: '/login', 
    failureFlash: true
  }),
  userController.login
);


// Logout 
router.get("/logout",userController.logout);

// Profile
router.get('/profile', userController.renderProfile);

// Update profile image
router.post('/profile/image', upload.single('profile[image]'), userController.updateProfileImage);

// Help & Support
router.get('/help', userController.renderHelp);

module.exports = router;
