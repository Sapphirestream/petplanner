const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Group = sequelize.define("group", {
  groupId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  days: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  freq: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Group;
