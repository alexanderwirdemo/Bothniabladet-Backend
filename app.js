// Importera
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var cors = require('cors');

// Läs in Schemana
var Image = require("./models/image.js");
var User = require("./models/user.js");

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

require("./routes/imageservice")(app, Image);
require("./routes/userservice")(app, User);
require("./routes/imageserver")(app);

// Port 
const port = process.env.PORT || 3001; // Heroku sparar port i process.env.PORT

// Starta server
app.listen(port, function () {
    console.log("Server running on port " + port);
});