const express = require("express");
const router = express.Router();

// Index - users
router.get("/", (req, res) => {
    res.send("GET for posts");
});

// Show - users
router.get("/:id", (req,res) => {
    res.send("GET for post id");
});

// POST - users
router.post("/", (req,res) => {
    res.send("POST for post id");
});

// DELETE - users
router.post("/:id", (req,res) => {
    res.send("DELETE for post id");
});

module.exports = router;