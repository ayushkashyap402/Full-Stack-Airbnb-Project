const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const userController = require("../controllers/users.js");
const user = require("../models/user.js");

// Render Signup Form
router.get("/signup",userController.renderSignupForm);


// Signup Route
router.post("/signup", 
    wrapAsync(userController.signup));


// Render Login Form
router.get("/login", userController.renderLoginForm);


// Passport Authentication Login 
router.post("/login",
  saveRedirectUrl,
  passport.authenticate("local",{ 
    failureRedirect: '/login', 
    failureFlash: true
}),
userController.login
);


// Logout 
router.get("/logout",userController.logout);

module.exports = router;
