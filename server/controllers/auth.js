require("dotenv").config();
const { Op } = require("sequelize");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { SECRET } = process.env;

//Actual Token Creation
const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

exports.logout = (req, res) => {
  console.log("logout");
  res.send("Hello").status(200);
};

//* Log In User
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //find given username on db
    const foundUser = await User.findOne({ where: { username: username } });

    if (foundUser) {
      //check if password is correct
      const isAuthenticated = bcrypt.compareSync(password, foundUser.password);

      if (isAuthenticated) {
        //create token (ln 12)
        const token = createToken(
          foundUser.dataValues.username,
          foundUser.dataValues.id
        );

        const exp = Date.now() + 1000 * 60 * 60 * 48;

        //sends token to the front end
        res.status(200).send({
          username: foundUser.dataValues.username,
          userId: foundUser.dataValues.id,
          token: token,
          exp: exp,
        });
      } else {
        res.status(400).send("Password was incorrect");
      }
    } else {
      res.status(404).send("User doesn't exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

//*Register New User
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, firstname, lastname, password } = req.body;

    //Check if User or Email Already Exists on db
    const foundUser = await User.findOne({
      where: { [Op.or]: [{ username: username }, { email: email }] },
    });

    if (foundUser) {
      //send if User cannot be created
      res.status(400).send("User Already Exists!");
    } else {
      //create the hashed password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      //creates new user object and sends it to the db
      const newUser = await User.create({
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hash,
      });

      //create the token from user data (ln 12)
      const token = createToken(
        newUser.dataValues.username,
        newUser.dataValues.id
      );

      //calculates experation date to send to user (match token)
      const exp = Date.now() + +1000 * 60 * 60 * 48;

      //sends user data + token + exp back to the front end
      res.status(200).send({
        username: newUser.dataValues.username,
        userId: newUser.dataValues.id,
        token: token,
        exp: exp,
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
