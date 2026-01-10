const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { cloudinary } = require('../cloudConfig');


// Render Signup Form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Signup Route
module.exports.signup = async(req ,res) => {
  try{
    let {username , email ,password} = req.body;
    const newUser = new User ({email, username});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser,(err) => {
      if(err) {
        return next(err);
      }
      req.flash("success","Welcome to Explorer");
      res.redirect("/listings");
    });
 } catch(e){
       req.flash("error", e.message);
       res.redirect("/signup");
  }
};


// Render Login Form
module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};


// Render profile page
module.exports.renderProfile = async (req, res) => {
  if(!req.user) {
    req.flash('error','You must be logged in.');
    return res.redirect('/login');
  }
  const userId = req.user._id;
  const user = await User.findById(userId);
  const listingsCount = await Listing.countDocuments({ owner: userId });
  const reviewsCount = await Review.countDocuments({ author: userId });
  const userListings = await Listing.find({ owner: userId }).limit(6);
  res.render('users/profile.ejs', { user, listingsCount, reviewsCount, userListings });
};


// Update profile image
module.exports.updateProfileImage = async (req, res, next) => {
  try {
    if (!req.user) {
      req.flash('error','You must be logged in.');
      return res.redirect('/login');
    }
    const user = await User.findById(req.user._id);
    if (req.file) {
      // delete previous image from cloudinary if exists
      if (user.image && user.image.filename) {
        try { await cloudinary.uploader.destroy(user.image.filename); } catch(e) { }
      }
      user.image = { url: req.file.path, filename: req.file.filename };
      await user.save();
      req.flash('success', 'Profile image updated');
    }
    res.redirect('/profile');
  } catch (e) {
    next(e);
  }
};


// Passport Authentication Login 
module.exports.login = async(req, res) => {
    req.flash("success","Welcome back to Explorer!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


// Logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
     if(err) {
        return next(err);
     }
     req.flash("success","you are logged out!");
     res.redirect("/listings");
    });
};

// Render Help & Support page
module.exports.renderHelp = (req, res) => {
  res.render('additional/help.ejs');
};