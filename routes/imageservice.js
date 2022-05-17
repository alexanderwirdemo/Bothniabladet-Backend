module.exports = function(app, exiftool, Image, AdvancedSearch){


        // GET-anrop för att göra en avancerad sökning
        app.post("/images/advanced", function(req, res) {
            console.log('Finding images based on advanced search');
            console.dir(req);

            var advancedSearch = new AdvancedSearch();

            advancedSearch.advanced_searchString = req.body.advanced_searchString;
            advancedSearch.advanced_searchTitle = req.body.advanced_searchTitle;
            advancedSearch.advanced_searchPhotografer = req.body.advanced_searchPhotografer;
            advancedSearch.advanced_searchPlace = req.body.advanced_searchPlace;

            var vesselObject = {reviewed: true}
            var keywordsObject = {keywords: {$all: advancedSearch.advanced_searchString}}
            var titleObject = {title: advancedSearch.advanced_searchTitle}
            var photographerObject = {photographer: advancedSearch.advanced_searchPhotografer}
            var placeObject = {"Location.place": advancedSearch.advanced_searchPlace}
            var allImages = [];

            if(advancedSearch.advanced_searchString!=""){
                vesselObject = Object.assign(vesselObject,keywordsObject)
            }

            if(advancedSearch.advanced_searchTitle!=""){
                vesselObject = Object.assign(vesselObject,titleObject)
            }

            if(advancedSearch.advanced_searchPhotografer!=""){
                vesselObject = Object.assign(vesselObject,photographerObject)
            }

            if(advancedSearch.advanced_searchPlace!=""){
                vesselObject = Object.assign(vesselObject,placeObject)
            }

            const query = vesselObject
            
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
                console.dir(query);
                
                return res.json({
                    allImages
                }); 
            });
        });



    // POST-anrop för att lägga till en bild
app.post("/images/add", function(req, res) {

    console.log('bilddata till databasen:');
    console.dir(req.body);

    // Ny instans av Image
    var image = new Image();
    var taggar;

    //funkar, ger dock ej gps men en del annat... pixlar och kamera, t ex
    exiftool
  .read('uploaded_images/'+req.body.title)
  .then((tags ) =>{
     console.log("taggar:");
        console.log(tags);

// Skapa ett nytt objekt
image.title = req.body.title;
image.date = req.body.date;
image.photographer = req.body.photographer;
image.category = req.body.category;
image.subcategory = req.body.subcategory;
image.Location = req.body.Location;
image.Technical_data = req.body.Technical_data;
// Justera tekniska data
image.Technical_data.resolution = tags.Megapixels;
image.Technical_data.camera = tags.Make+' '+tags.Model;
image.description = req.body.description;
image.keywords = req.body.keywords;
image.restrictions = req.body.restrictions;
image.remaining_publications = req.body.remaining_publications;
image.publication_dates = req.body.publication_dates;
image.price = req.body.price;
image.reviewed = req.body.reviewed;
image.variants = req.body.variants;

// Sparar bilden, fångar upp felmeddelanden
image.save(function(err) {
    if(err) {
        res.send(err);
    }
    res.json(image);
});
  }

  )
  .catch((err) => console.error("Something terrible happened: ", err));
});

// DELETE-anrop för att radera bild
app.delete("/images/remove/:id", function(req, res){
    var deleteId = req.params.id;

    Image.deleteOne({
        _id: deleteId
    }, function(err, Image) {
        if(err) {
            res.send(err);
        }
        res.json({ message: "Bild borttagen ur databasen, id: " + deleteId});
    });
});

    // GET-anrop för att få alla bilder
    app.get("/images", function(req, res) {
        console.log('Finding all images....');
        var allImages = [];
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
            return res.json({
                allImages
            }); 
        });
    });

    // GET-anrop för att få alla bilder som behöver granskas
    app.get("/images/toreview", function(req, res) {
        console.log('Finding all images to review....');
        var allImagesToReview = [];
        const query = { reviewed: false };
        Image.find(query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            for(let index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                allImagesToReview.push(result[index]._doc); 
            }
            console.dir(allImagesToReview);
            return res.json({
                allImagesToReview
            }); 
        });
    });

    // GET-anrop för att söka på ett nyckelord
    // Denna används inte i nuläget, behöver den vara kvar? --Fredrik
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

    // GET-anrop för att få alla bilder om sökfältet är tomt
    app.get("/images/keywords/", function(req, res) {
        console.log('Finding all images....');
        var allImages = [];
        const query = {reviewed: true};
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
    app.get("/images/keywords/:keywords", function(req, res) {
        console.log('Finding images based on keywords');
        var placeholder = req.params.keywords
        console.dir(placeholder)
        var allImages = [];
        var searchKeywords = Object.values(placeholder.split(','));
        console.dir(searchKeywords);
        const query = {keywords: {$all: searchKeywords}, reviewed: true, restrictions: "Inga"};
        
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
            for(var index=0; index<result.length; index++){
                console.dir(result[index]._doc);
                allImages.push(result[index]._doc); 
            }
            console.dir(allImages);
            
            return res.json({
                allImages
            }); 
        });
    });

    // PUT-anrop för att uppdatera granskning
    app.put("/images/reviewed/update/:id", async function(req, res) {
        console.log('Updating the review status of the image');
        console.dir(req);
        var updateId = req.params.id;
        console.log('updateId: ',updateId);
        
        Image.findByIdAndUpdate(updateId, req.body, {new: true})
        .then(image => {
            res.json(image); 
        })
        .catch(function () {
            console.log("Promise Rejected");
            res.send();
       });
            
        });

    // PUT-anrop för att lägga till variant
    app.put("/images/addvariant", async function(req, res) {
        console.log('Adding variant');
        console.dir(req.body);
        var updateId = req.body.id;
        console.log('updateId: ',updateId);
        const variants = {
            'variants' : req.body.variants
        }
        console.log('variant: ',variants);

        
        Image.findByIdAndUpdate(updateId, variants, {new: true})
        .then(image => {
            res.json(image); 
        })
        .catch(function () {
            console.log("Promise Rejected");
            res.send();
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
    //Behöver denna vara kvar? --Fredrik
    app.get("/images/title/:title", function(req, res) {
        console.log('Finding images based on title....');
        var foundImagesTitle = [];
        var title = req.params.title;
        const query = { "Administrative_data.title": title };
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
    app.get("/images/category/:category", function(req, res) {
        console.log('Finding images based on category....');
        var allImages = [];
        var category = req.params.category;
        const query = { "category": category };
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

    // GET-anrop för att få bilder baserat på underkategori
    app.get("/images/subcategory/:subcategory", function(req, res) {
        console.log('Finding images based on subcategory....');
        var allImages = [];
        var subcategory = req.params.subcategory;
        const query = { "subcategory": subcategory };
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

