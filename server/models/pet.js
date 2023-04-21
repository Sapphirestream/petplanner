const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Pet = sequelize.define("pet", {
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
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bday: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  vet: {
    type: Sequelize.STRING,
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
