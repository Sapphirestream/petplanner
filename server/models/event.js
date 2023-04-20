const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Event = sequelize.define("event", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  startTime: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  completion: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  reminders: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  notes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Event;
