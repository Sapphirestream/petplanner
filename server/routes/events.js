const express = require("express");

const eventController = require("../controllers/events");

const router = express.Router();

//Event Routes
router.get("/getEvents/:userId", eventController.getEvents);
router.post("/addEvent", eventController.addEvent);
router.delete("/deleteEvent/:Id", eventController.deleteEvent);

module.exports = router;
