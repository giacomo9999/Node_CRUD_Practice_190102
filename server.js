const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config({ path: 'variables.env' });

MongoClient.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function() {
  console.log("Listening on Port 3000.");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  console.log(req.body);
  console.log("I am filled with animal lusts.");
  res.send("test.");
});
