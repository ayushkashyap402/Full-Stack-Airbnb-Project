const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn , isOwner , validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");


router.route("/")
// Index Route
  .get(wrapAsync(listingController.index))   

// Create route
//   .post(
//      isLoggedIn,
//      validateListing,
//      wrapAsync(listingController.createListing)
// );
.post((req,res) => {
  res.send(req.body);
});

// New Route
router.route("/new")
 .get( isLoggedIn, listingController.renderNewForm );


router.route("/:id")
 // Show route
  .get(wrapAsync(listingController.showListing))

  //Update Route
  .put(
  isLoggedIn,
  isOwner,
  validateListing,
   wrapAsync(listingController.updateListing))

  // delete route
  .delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing));


//Edit Route
  router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports = router;


