const Pet = require("../models/pet");
const Permission = require("../models/permission");

exports.getPets = async (req, res) => {
  console.log("getPets");
  res.send("getPets").status(200);
};

//create a new pet
exports.addPet = async (req, res) => {
  console.log("add Pet");

  try {
    const { userId, name, image, type, breed, vet, bday, food, notes } =
      req.body;
    const pet = await Pet.create({
      userId,
      name,
      image,
      type,
      breed,
      vet,
      bday,
      food,
      notes,
    });

    //make sure the owner has editing permissions
    await Permission.create({ userId, petId: pet.dataValues.Id, edit: true });
  } catch (err) {
    console.log(err);
  }
  res.status(200).send("Pet Added");
};
