module.exports = function(app, Image){


    // GET-anrop för att få alla bilder
    // Kommentar
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

    // GET-anrop för att söka på ett nyckelord
    app.get("/images/keywords/:keyword", function(req, res) {
        console.log('Finding images based on keyword');
        var allImages = [];
        var searchKeyword = req.params.keyword;
        console.log(searchKeyword);
        
        Image.find({keywords: searchKeyword}, function(err, result){
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
    
    }