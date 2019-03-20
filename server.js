const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
var knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("It is working");
});

app.post("/signin", signin.handleSignin(knex, bcrypt));

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, knex);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, knex);
});

app.post("/image", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});
