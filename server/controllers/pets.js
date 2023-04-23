const Pet = require("../models/pet");
const Permission = require("../models/permission");
const User = require("../models/user");
const Weight = require("../models/weight");
const Medication = require("../models/medication");

exports.getPets = async (req, res) => {
  console.log("getPets");

  const { userId } = req.params;

  try {
    const pets = await User.findOne({
      attributes: ["Id", "username"],
      where: { Id: userId || 1 },
      include: { model: Pet, include: [Weight, Medication] },
    });
    res.send(pets).status(200);
  } catch (err) {
    console.log(err);
  }
};

//* PET RECORDS

//Create New Pet
exports.addPet = async (req, res) => {
  console.log("add Pet");

  try {
    const { userId, name, image, type, breed, vet, bday, age, food, notes } =
      req.body;

    const pet = await Pet.create({
      userId,
      name,
      image,
      type,
      breed,
      bday,
      age,
      vet,
      food,
      notes,
    });

    //make sure the owner has editing permissions
    await Permission.create({
      userId,
      petId: pet.dataValues.Id,
      owner: true,
      edit: true,
    });
  } catch (err) {
    console.log(err);
  }
  res.status(200).send("Pet Added");
};

//Edit Pet
exports.editPet = async (req, res) => {
  try {
    const { name, image, type, breed, vet, bday, age, food, notes } = req.body;
    const { Id } = req.params;

    await Pet.update(
      { name, image, type, breed, vet, bday, age, food, notes },
      { where: { Id: Id } }
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

//Delete Pet
exports.deletePet = async (req, res) => {};

//* WEIGHT RECORDS

//Create New Weight Record
exports.addWeight = async (req, res) => {
  try {
    const { petId, weight, weightDate } = req.body;

    await Weight.create({ petId, weight, weightDate });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.send(err).status(400);
  }
};

//Edit Weight Record
exports.editWeight = async (req, res) => {
  try {
    const { petId, weight, weightDate } = req.body;
    const { Id } = req.params;

    const record = await Weight.update(
      { petId, weight, weightDate },
      { where: { Id: Id } }
    );

    res.send(record).status(200);
  } catch (err) {
    console.log(err);
    res.send(err).status(400);
  }
};

// Delete Weight Record
exports.deleteWeight = async (req, res) => {
  try {
    const { Id } = req.params;

    await Weight.destroy({
      where: { Id: Id },
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
