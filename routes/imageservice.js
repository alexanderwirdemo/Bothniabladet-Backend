module.exports = function(app, Image){
var Image = require("../models/image.js");

    // POST-anrop för att lägga till en bild
app.post("/images/add", function(req, res) {

    console.dir(req.body);

    // Ny instans av Image
    var image = new Image();

    // Skapa ett nytt objekt
    image.title = req.body.title;
    image.date = req.body.date;
    image.photographer = req.body.photographer;
    image.category = req.body.category;
    image.subcaregory = req.body.subcaregory;
    image.Location = req.body.Location;
    image.Technical_data = req.body.Technical_data;
    image.keywords = req.body.keywords;
    image.restrictions = req.body.restrictions;

    // Sparar bilden, fångar upp felmeddelanden
    image.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json(image);
    });
    
});

    // GET-anrop för att få alla bilder
    app.get("/images", function(req, res) {
        console.log('Finding all images....');
        var allImages = [];
        //const query = {news_event: "Frölunda besegrade Växjö i andra kvartsfinalen" };
        //const query = {"Administrative_data.title": "Frölundalaget i Scandinavium" };
        const query = {};
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                allImages.push(result[index]._doc); 
            }
            console.dir(allImages);
            /*for(let index=0; index<allImages.length; index++){
                console.log(allImages);
            }*/
            
            return res.json({
                allImages
            }); 
        });
    });

    // GET-anrop för att söka på ett nyckelord
    app.get("/images/keyword/:keyword", function(req, res) {
        console.log('Finding images based on keyword');
        var allImages = [];
        var searchKeyword = req.params.keyword;
        console.log(searchKeyword);
        const query = { keywords: searchKeyword };
        
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                allImages.push(result[index]._doc); 
            }
            console.dir(allImages);
            
            return res.json({
                allImages
            }); 
        });
    });

    // GET-anrop för att söka på flera nyckelord
    app.get("/images/keywords/", function(req, res) {
        console.log('Finding images based on keywords');
        var allImages = [];
        var searchKeywords = Object.values(req.query.keywords.split(',')); // OBS, array måste heta keywords
        console.dir(searchKeywords);
        const query = {keywords: {$all: searchKeywords}};
        
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                allImages.push(result[index]._doc); 
            }
            console.dir(allImages);
            
            return res.json({
                allImages
            }); 
        });
    });

    // GET-anrop för att söka på publiceringsdatum
    app.get("/images/publishing_date/:date", function(req, res) {
        console.log('Finding images based on publishing date');
        var allImages = [];
        var searchDate = new Date(req.params.date).toISOString().replace('Z', '')+'+00:00'.toString();
        console.log(searchDate);
        const query = { "Administrative_data.publishing_date": searchDate };
        
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                allImages.push(result[index]._doc); 
            }
            console.dir(allImages);
            
            return res.json({
                allImages
            }); 
        });
    });

    // GET-anrop för att söka på användarrättigheter
    app.get("/images/restrictions/:restriction", function(req, res) {
        console.log('Finding images based on restriction status');
        var allImages = [];
        var restriction = req.params.restriction;
        console.log(restriction);
        const query = { "restrictions": restriction };
        
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                allImages.push(result[index]._doc); 
            }
            console.dir(allImages);
            
            return res.json({
                allImages
            }); 
        });
    });

    // PUT-anrop för att uppdatera användarrättigheter WIP, otestad
    app.put("/images/restrictions/update/:id", function(req, res) {
        console.log('Updating the restriction put on the image');
        var updateId = req.params.id;
        console.log('updateId: ',updateId);
        
        Image.findByIdAndUpdate(updateId, req.body, {new: true})
        then(image => {
            if(err){
                console.log(err);
                res.send(err);
            }
            res.json(image); 
        });
            
        });
    
    // GET-anrop för att få bilder baserat på titel
    app.get("/title", function(req, res) {
        console.log('Finding images based on title....');
        var foundImagesTitle = [];
        var query = { "Administrative_data.title": "Växjö Lakers målvakt" };
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                foundImagesTitle.push(result[index]._doc); 
            }
            console.dir(foundImagesTitle);
            
            return res.json({
                foundImagesTitle
            }); 
        });
    });

    // GET-anrop för att få bilder baserat på kategori
    app.get("/category", function(req, res) {
        console.log('Finding images based on category....');
        var foundImagesCategory = [];
        var query = { "category": "Sport" };
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                foundImagesCategory.push(result[index]._doc); 
            }
            console.dir(foundImagesCategory);
            
            return res.json({
                foundImagesCategory
            }); 
        });
    });

    // GET-anrop för att få bilder baserat på underkategori
    app.get("/subcategory", function(req, res) {
        console.log('Finding images based on subcategory....');
        var foundImagesSubcategory = [];
        var query = { "subcategory": "Ishockey" };
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                foundImagesSubcategory.push(result[index]._doc); 
            }
            console.dir(foundImagesSubcategory);
            
            return res.json({
                foundImagesSubcategory
            }); 
        });
    });    

    // GET-anrop för att få bilder baserat på nyhetshändelse TA BORT PÅ SIKT
    app.get("/event", function(req, res) {
        console.log('Finding images based on news event....');
        var allImagesEvent = [];
        var query = { "news_event": "Regerande världsmästare tog prestigefull förstaplacering i Saudi Arabian grand prix" };
        Image.find(query, function(err, result){
            if(err){
                 console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                allImagesEvent.push(result[index]._doc); 
            }
            console.dir(allImagesEvent);
                
            return res.json({
                allImagesEvent
            }); 
        });
    });        




    }

