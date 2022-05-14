const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
    {
    title : { type: String },
    date : { type: Date },
    photographer : { type: String },
    category : { type: [String] },
    subcategory : { type: [String] },
    Location : {
        GPSCoordinates : { type: String },
        place : { type: String },
        city : { type: String },
        region : { type: String },
        country : { type: String },
    },
    Technical_data : {
        format : { type: String },
        image_size : { type: String },
        file_size : { type: String },
        resolution : { type: String },
        camera : { type: String },
    },
    keywords: { type: [String] },
    restrictions: { type: String }, 
    price: { type: Number },
    reviewed: { type: Boolean },
    variants: { type: Array },
    });

    ImageSchema.index( { keywords: 1 } );
    var collectionName = "image";
    const Image = mongoose.model("image", ImageSchema, collectionName);
    
    module.exports = Image;