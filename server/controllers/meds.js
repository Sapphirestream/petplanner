const Med = require("../models/medication");

//Add Med
exports.addMed = async (req, res) => {
  try {
    const { petId, name, official, dosage, freq, notes } = req.body;

    const meds = await Med.create({
      petId,
      name,
      official,
      dosage,
      freq,
      notes,
    });
    res.status(200).send(meds);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

//Edit Med
exports.editMed = async (req, res) => {
  try {
    const { petId, name, official, dosage, freq, notes } = req.body;
    const { Id } = req.params;

    const record = await Med.update(
      { petId, name, official, dosage, freq, notes },
      { where: { Id: Id } }
    );

    res.status(200).send(record);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// Delete Med
exports.deleteMed = async (req, res) => {
  try {
    const { Id } = req.params;

    await Med.destroy({
      where: { Id: Id },
    });

    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err);
  }
};
//
