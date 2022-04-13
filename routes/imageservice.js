module.exports = function(app, Image){


    // GET-anrop för att få alla bilder
    // Kommentar
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
    
    }