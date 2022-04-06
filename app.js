// Importera
const express = require("express");
//var https = require('https');
//var http = require('http');
//var fs = require('fs');
//const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const session = require('express-session');
//const mongoDBStore = require("connect-mongodb-session")(session);

// Läs in Schemana
var Image = require("./models/image.js");

const username = "bothnia_admin";
const password = "bothniabladet";
const cluster = "bothniabladet";
const dbname = "bothniabladet";

// Ansluta till MongoDB
mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.xd4os.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Anslutningen till databasen
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Skapa instans av express
const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true}));

require("./routes/imageservice")(app, Image);

// Port 
const port = process.env.PORT || 3001; // Heroku sparar port i process.env.PORT

// Starta server
app.listen(port, function () {
    console.log("Server running on port " + port);
});