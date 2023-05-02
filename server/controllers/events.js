const Pet = require("../models/pet");
const User = require("../models/user");
const Event = require("../models/event");
const { Op } = require("sequelize");

//get Events (Home Page)
exports.getEventsOLD = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await User.findOne({
      attributes: ["Id", "username"],
      where: { Id: userId || 1 },
      include: {
        model: Pet,
        attributes: ["Id", "name", "image"],
        include: [Event],
      },
    });
    res.send(events).status(200);
  } catch (err) {
    console.log(err);
  }
};

// trying get Events again
exports.getEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    //retrieve all petIds of pets the user has access to
    const pets = await User.findOne({
      attributes: ["Id", "username"],
      where: { Id: userId },
      include: {
        model: Pet,
        attributes: ["Id", "name", "image"],
        through: { attributes: ["edit"] },
      },
    });

    const events = [];

    //only grab events for the current day forward
    const currTime = new Date();
    currTime.setHours(0, 0, 0);

    for (let i = 0; i < pets.dataValues.pets.length; i++) {
      const petId = pets.dataValues.pets[i].dataValues.Id;

      //Values wanted by Event Object from Pet
      const petName = pets.dataValues.pets[i].dataValues.name;
      const petImage = pets.dataValues.pets[i].dataValues.image;
      const petEdit =
        pets.dataValues.pets[i].dataValues.permission.dataValues.edit;

      //retrieve all future events by petId
      const event = await Event.findAll({
        where: {
          [Op.and]: [{ petId: petId }, { startTime: { [Op.gt]: currTime } }],
        },
      });

      // Add values from Pet & push to array
      for (let n = 0; n < event.length; n++) {
        const eventPlus = {
          ...event[n].dataValues,
          petId,
          petName,
          petImage,
          petEdit,
        };
        events.push(eventPlus);
      }
    }

    res.status(200).send(events);
  } catch (err) {
    console.log(err);
  }
};

//add Event
exports.addEvent = async (req, res) => {
  try {
    const {
      name,
      startTime,
      endTime,
      completion,
      reminders,
      location,
      notes,
      petId,
    } = req.body;

    const event = await Event.create({
      name,
      startTime,
      endTime,
      completion,
      reminders,
      location,
      notes,
      petId,
    });

    res.status(200).send(event);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

//delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { Id } = req.params;

    await Event.destroy({ where: { Id: Id } });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
