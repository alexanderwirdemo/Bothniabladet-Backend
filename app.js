// Importera
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ExifTool = require("exiftool-vendored").ExifTool
const exifr = require("exifr");
const path = require("path");

// Modules required for most of these exercises
const fs = require('fs');
const piexif = require('piexifjs');


var cors = require('cors');

// Läs in Schemana
var Image = require("./models/image.js");
var User = require("./models/user.js");
const AdvancedSearch = require("./models/advancedSearch.js");

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

// CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,

}
app.use(cors(corsOptions));

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	next();
  });


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true}));

// Möjlighet att nå bilderna sparade på servern
app.use(express.static('public')); 
app.use('/uploaded_images', express.static('uploaded_images'));
app.use(express.static('uploaded_images'));

const exiftool = new ExifTool({ taskTimeoutMillis: 5000 });


require("./routes/imageservice")(app, Image, AdvancedSearch);
require("./routes/userservice")(app, User);
require("./routes/imageserver")(app, exiftool, exifr, fs, piexif);

// Port 
const port = process.env.PORT || 3001; // Heroku sparar port i process.env.PORT

// Starta server
app.listen(port, function () {
    console.log("Server running on port " + port);
});