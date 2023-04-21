const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Weight = sequelize.define("weight", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  weight: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  weightDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Weight;
