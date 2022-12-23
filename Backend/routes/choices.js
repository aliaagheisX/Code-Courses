const express = require("express");
const router = express.Router();
const choicesController = require("../controllers/choicesController");

router.post("/create", choicesController.postChoice);

module.exports = router;
