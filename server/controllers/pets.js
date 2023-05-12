const Pet = require("../models/pet");
const Permission = require("../models/permission");
const User = require("../models/user");
const Weight = require("../models/weight");
const Medication = require("../models/medication");

//get Pets (Pet Page)
exports.getPets = async (req, res) => {
  const userId = req.tokenId;

  try {
    const pets = await User.findOne({
      attributes: ["Id", "username"],
      where: { Id: userId },
      order: [
        [Pet, Weight, "weightDate", "ASC"],
        [Pet, Medication, "name", "ASC"],
      ],
      include: { model: Pet, include: [Weight, Medication] },
    });
    res.send(pets).status(200);
  } catch (err) {
    //console.log(err);
    res.sendStatus(err.statusCode);
  }
};

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
exports.deletePet = async (req, res) => {
  try {
    const { Id } = req.params;

    await Pet.destroy({
      where: { Id: Id },
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
