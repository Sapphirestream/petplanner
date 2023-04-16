const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Pet = sequelize.define("pet", {
  petId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  vet: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bday: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  food: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  notes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Pet;
