const Pet = require("../models/pet");
const Permission = require("../models/permission");
const User = require("../models/user");

exports.getPets = async (req, res) => {
  console.log("getPets");

  const userId = req.get("userId");

  try {
    const pets = await User.findOne({
      attributes: ["Id", "username"],
      where: { Id: userId || 1 },
      include: Pet,
    });
    res.send(pets).status(200);
  } catch (err) {
    console.log(err);
  }
  ``;
};

//create a new pet
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
