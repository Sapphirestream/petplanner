const Weight = require("../models/weight");

//Create New Weight Record
exports.addWeight = async (req, res) => {
  try {
    const { petId, weight, weightDate } = req.body;

    await Weight.create({ petId, weight, weightDate });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
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

    res.status(200).send(record);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
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
