const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Users = require("./user");
const Pets = require("./pet");

const Permission = sequelize.define("permission", {
  permissionId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  petId: {
    type: Sequelize.INTEGER,
    references: {
      model: Pets,
      key: "petId",
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
  },
  edit: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Permission;
