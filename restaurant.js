// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Star Wars Characters (DATA)
// =============================================================
var reservations = [];

var waitList = []
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// API Table Link
app.get("/api/tables", function(req, res) {
  res.json(reservations);
});

// API Waitlist Linka
app.get("/api/waitlist", function(req, res) {
  res.json(waitList);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  var newReservation = req.body;
  // newReservation.customerName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  if (reservations.length >= 5) {
    waitList.push(newReservation);
  } else {
    reservations.push(newReservation);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
