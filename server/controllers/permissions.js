const Pet = require("../models/pet");
const User = require("../models/user");
const Permission = require("../models/permission");
//

//Get Permissions
exports.getPerm = async (req, res) => {
  const { petId } = req.params;

  try {
    const permissions = await Pet.findAll({
      attributes: ["Id", "name"],
      where: { Id: petId },
      include: [
        {
          model: User,
          attributes: ["Id", "username"],
          through: {
            attributes: ["Id", "owner", "edit", "userId", "petId"],
          },
        },
      ],
    });

    res.status(200).send(permissions);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//create new Permission
exports.addPerm = async (req, res) => {
  try {
    const { username, petId, owner, edit } = req.body;

    const user = await User.findOne({ where: { username: username } });

    if (user === null) {
      throw new Error("User does not exist!");
    }

    const exists = await Permission.findOne({
      where: { userId: user.Id, petId: petId },
    });

    if (exists !== null) {
      throw new Error("User already has Permissions!");
    }

    await Permission.create({ petId, userId: user.Id, owner, edit });
    res.status(200).send(exists);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//Delete Permission
exports.deletePerm = async (req, res) => {
  try {
    const { Id } = req.params;

    await Permission.destroy({
      where: { Id: Id },
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
