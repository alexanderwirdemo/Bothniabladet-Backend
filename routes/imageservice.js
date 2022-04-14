module.exports = function(app, Image){


    // GET-anrop för att få alla bilder
    app.get("/images", function(req, res) {
        console.log('Finding all images....');
        var allImages = [];
        Image.find({}, function(err, result){
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

    // GET-anrop för att få bilder baserat på nyhetshändelse
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