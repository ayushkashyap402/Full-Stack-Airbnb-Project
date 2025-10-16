const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Index Route 
module.exports.index = async(req, res) => {
  const allListings = await Listing.find({});
       res.render("listings/index.ejs", { allListings });
};


// New Route
module.exports.renderNewForm = (req,res) => {
   res.render("listings/new.ejs");
}



// show Route
module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews",
      populate: {
        path: "author",
      },
  })
    .populate("owner");
    if(!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  };


// Create Route
module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // ✅ Handle image upload
  if (req.file) {
    // If image uploaded
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  } else {
    // If no image uploaded, set a default image
    newListing.image = {
      url: "https://res.cloudinary.com/db7xftttb/image/upload/v1760205238/explorer_DEV/jrbpiqqzqc7gf1kgp3dy.jpg",
      filename: "explorer_DEV/jrbpiqqzqc7gf1kgp3dy"
    };
  }

  // ✅ Add map geometry
  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};


// Edit Route
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
   if(!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
   }

   let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};


// Update Route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== "undefined") {
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = { url , filename };
  await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};