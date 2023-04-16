const express = require("express");

const petController = require("../controllers/pet");

const router = express.Router();

router.get("/getPets", petController.getPets);

module.exports = router;
