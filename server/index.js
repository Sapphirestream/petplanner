require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();

const authRoutes = require("./routes/auth");
const petRoutes = require("./routes/pets");

const sequelize = require("./util/database");
const User = require("./models/user");
const Pet = require("./models/pet");
const Permission = require("./models/permission");
const Medication = require("./models/medication");
const Weight = require("./models/weight");
const Group = require("./models/group");
const Event = require("./models/event");

Pet.hasMany(Medication);
Pet.hasMany(Weight);
Medication.belongsTo(Pet);
Weight.belongsTo(Pet);

User.hasMany(Pet);
Pet.belongsTo(User);

User.belongsToMany(Pet, { through: Permission });
Pet.belongsToMany(User, { through: Permission });

Pet.hasMany(Event);
Event.belongsTo(Pet);

Group.hasMany(Event);
Event.belongsTo(Group);

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/pets", petRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
