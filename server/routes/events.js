const express = require("express");

const eventController = require("../controllers/events");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

//Event Routes
router.get("/getPetId", isAuthenticated, eventController.getPetId);
router.get("/getEvents", isAuthenticated, eventController.getEvents);
router.post("/addEvent", isAuthenticated, eventController.addEvent);
router.put("/editEvent/:Id", isAuthenticated, eventController.editEvent);
router.put("/markComplete/:Id", isAuthenticated, eventController.markComplete);
router.delete("/deleteEvent/:Id", isAuthenticated, eventController.deleteEvent);

module.exports = router;
