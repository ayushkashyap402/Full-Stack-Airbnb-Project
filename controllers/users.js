const User = require("../models/user");


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