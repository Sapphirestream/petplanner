const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Users = require("./user");
const Pets = require("./pet");

const Permission = sequelize.define("permission", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  owner: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  edit: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Permission;
