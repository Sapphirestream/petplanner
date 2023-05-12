const express = require("express");

const petController = require("../controllers/pets");
const weightController = require("../controllers/weight");
const permController = require("../controllers/permissions");
const medController = require("../controllers/meds");

const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

// Pet Routes
router.get("/getPets", isAuthenticated, petController.getPets);
router.post("/addPet", isAuthenticated, petController.addPet);
router.put("/editPet/:Id", isAuthenticated, petController.editPet);
router.delete("/deletePet/:Id", isAuthenticated, petController.deletePet);

//Permission Routes
router.get("/getPerm/:petId", isAuthenticated, permController.getPerm);
router.post("/addPerm", isAuthenticated, permController.addPerm);
router.delete("/deletePerm/:Id", isAuthenticated, permController.deletePerm);

//Med Routes
router.post("/addMed", isAuthenticated, medController.addMed);
router.put("/editMed/:Id", isAuthenticated, medController.editMed);
router.delete("/deleteMed/:Id", isAuthenticated, medController.deleteMed);

// Weight Routes
router.post("/addWeight", isAuthenticated, weightController.addWeight);
router.put("/editWeight/:Id", isAuthenticated, weightController.editWeight);
router.delete(
  "/deleteWeight/:Id",
  isAuthenticated,
  weightController.deleteWeight
);

module.exports = router;
