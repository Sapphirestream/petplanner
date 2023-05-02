const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Medication = sequelize.define("medication", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  official: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  dosage: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  freq: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  notes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Medication;
