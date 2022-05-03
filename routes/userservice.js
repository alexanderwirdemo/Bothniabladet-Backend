module.exports = function(app, User){
    var User = require("../models/user.js");
    
    
        // GET-anrop för att få alla användare
        app.get("/users", function(req, res) {
            console.log('Finding all users....');
            var allUsers = [];
            const query = {};
            User.find(query, function(err, result){
                if(err){
                    console.log(err);
                    res.send(err);
                }
                for(let index=0; index<result.length; index++){
                    console.dir(result[index]._doc);
                    allUsers.push(result[index]._doc); 
                }
                console.dir(allUsers);
                return res.json({
                    allUsers
                }); 
            });
        });
    
        // POST-anrop för att söka på en användare
        app.post("/users/:user", function(req, res) {
            console.log('Finding one user');
            var user = [];
            console.dir(req.body);
            var username = req.body.username;
            var password = req.body.password;
            const query = { username: username, password: password };
            User.find(query, function(err, result){
                if(err){
                    console.log(err);
                    res.send(err);
                }
                for(let index=0; index<result.length; index++){
                    console.dir(result[index]._doc);
                    user.push(result[index]._doc); 
                }
                console.dir(user);
                return res.json({
                    user
                }); 
            });
        });

        // POST-anrop för att lägga till en användare
        app.post("/registeruser/:user", function(req, res) {
            console.log('Registring one user');
            console.dir(req.body);

            // Ny instans av User
            var user = new User();

            // Skapa ett nytt objekt
            user.username = req.body.username;
            user.password = req.body.password;
            user.name = req.body.name;
            user.invoiceAddress = req.body.invoiceAddress;
            user.role = req.body.role;
 
            // Sparar användaren, fångar upp felmeddelanden
            user.save(function(err) {
                if(err) {
                res.send(err);
                }
            res.json(user);
            });
        });
       
        }
    
    