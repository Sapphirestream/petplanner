const express = require("express");

const petController = require("../controllers/pets");
const weightController = require("../controllers/weight");
const permissionController = require("../controllers/permissions");
const medController = require("../controllers/meds");

const router = express.Router();

// Pet Routes
router.get("/getPets/:userId", petController.getPets);
router.post("/addPet", petController.addPet);
router.put("/editPet/:Id", petController.editPet);
router.delete("/deletePet/:Id", petController.deletePet);

//Permission Routes
router.get("/getPermissions/:petId", permissionController.getPermissions);
router.post("/addPermission", permissionController.addPermission);
router.delete("/deletePermission/:Id", permissionController.deletePermission);

//Med Routes
router.post("/addMed", medController.addMed);
router.put("/editMed/:Id", medController.editMed);
router.delete("/deleteMed/:Id", medController.deleteMed);

// Weight Routes
router.post("/addWeight", weightController.addWeight);
router.put("/editWeight/:Id", weightController.editWeight);
router.delete("/deleteWeight/:Id", weightController.deleteWeight);

module.exports = router;
