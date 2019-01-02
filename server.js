const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: "variables.env" });


let db;

MongoClient.connect(
  process.env.DATABASE,
  { useNewUrlParser: true },
  function(err, client) {
    if (err) return console.log(err);
    db = client.db("node_crud_190102");
    app.listen(3000, () => {
      console.log("Listening on 3000, yo");
    });
  }
);

app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(3000, function() {
//   console.log("Listening on Port 3000.");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("Saved to Database.");
    res.redirect("/");
  });
});
