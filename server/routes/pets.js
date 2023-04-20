const express = require("express");

const petController = require("../controllers/pets");

const router = express.Router();

router.get("/getPets", petController.getPets);
router.post("/addPet", petController.addPet);

module.exports = router;
