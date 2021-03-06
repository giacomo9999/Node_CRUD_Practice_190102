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
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  db.collection("quotes")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      // renders index.ejs
      res.render("index.ejs", { quotes: result });
    });
});

app.post("/quotes", (req, res) => {
  db.collection("quotes").insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("Saved to Database.");
    res.redirect("/");
  });
});

app.put("/quotes", (req, res) => {
  db.collection("quotes").findOneAndUpdate(
    { name: "Jim" },
    {
      $set: { name: req.body.name, quote: req.body.quote }
    },
    {
      sort: { _id: -1 },
      upsert: false
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/quotes", (req, res) => {
  db.collection("quotes").findOneAndDelete(
    { name: req.body.name },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({message:"A Jim quote has been deleted."});
    }
  );
});

