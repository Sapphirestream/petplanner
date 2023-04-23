const express = require("express");

const petController = require("../controllers/pets");

const router = express.Router();

// Pet Routes
router.get("/getPets/:userId", petController.getPets);
router.post("/addPet", petController.addPet);
router.put("/editPet/:Id", petController.editPet);
router.delete("/deletePet/:Id", petController.deletePet);

// Weight Routes
router.post("/addWeight", petController.addWeight);
router.put("/editWeight/:Id", petController.editWeight);
router.delete("/deleteWeight/:Id", petController.deleteWeight);

module.exports = router;
