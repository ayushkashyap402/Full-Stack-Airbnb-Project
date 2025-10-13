const express = require("express");
const router = express.Router();
const additionalController = require("../controllers/additional.js");

router.route("/about")
  .get(additionalController.aboutOwner);