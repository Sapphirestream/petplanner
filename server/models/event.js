const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Event = sequelize.define("event", {
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
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  completion: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  reminders: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  location: { type: Sequelize.STRING, allowNull: true },
  notes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Event;
