require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();

const authRoutes = require("./routes/auth");

const sequelize = require("./util/database");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

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
