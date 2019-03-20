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
    host: "localhost",
    user: "postgres",
    password: "test",
    database: "smartbrain"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(database.users);
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

app.listen(4000, () => {
  console.log("app is running on port 4000");
});
