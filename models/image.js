const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
    {
    date : { type: Date },
    news_event : { type: String },
    category : { type: [String] },
    subcategory : { type: [String] },
    Location : {
        place : { type: String },
        city : { type: String },
        region : { type: String },
        country : { type: String },
    },
    Administrative_data : {
        title : { type: String },
        description : { type: String },
        journalist : { type: String },
        photographer : { type: String },
        publishing_date : { type: Date },
    },
    Technical_data : {
        format : { type: String },
        version : { type: String },
        image_size : { type: String },
        file_size : { type: String },
        resolution : { type: String },
        camera : { type: String },
        GPScoordinates : { type: [Number] }
    },
    keywords: { type: [String] },
    restrictions: { type: String }, 
    });

    ImageSchema.index( { keywords: 1 } );
    var collectionName = "image";
    const Image = mongoose.model("image", ImageSchema, collectionName);
    
    module.exports = Image;