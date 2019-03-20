const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: process.env.API_KEY
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API"));
};

const handleImage = (req, res, knex) => {
  const { id, faces } = req.body;
  knex("users")
    .where("id", "=", id)
    .increment("entries", faces)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get count"));
};

module.exports = {
  handleImage,
  handleApiCall
};
