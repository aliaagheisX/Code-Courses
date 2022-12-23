const express = require("express");
const router = express.Router();
const choicesController = require("../controllers/choicesController");

router.post("/create", choicesController.postChoice);
router.get("/getByQuestion", choicesController.getChoicesByQuestion);

module.exports = router;
