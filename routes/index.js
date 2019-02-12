//require("dotenv").config();
const express = require("express");
const router = express.Router();
const key = process.env.KEYMAP;

/* GET home page */
router.get("/", (req, res, next) => res.render("index", { key }));

module.exports = router;
