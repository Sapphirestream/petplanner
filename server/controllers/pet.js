const Pets = require("../models/pet");

exports.getPets = async (req, res) => {
  console.log("getPets");
  res.send("getPets").status(200);
};
