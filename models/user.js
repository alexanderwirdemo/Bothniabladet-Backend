const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
    username : { type: String },
    password : { type: String },
    name : { type: String },
    invoiceAddress : { type: String },
    role : { type: String } 
    });

    var collectionName = "user";
    const User = mongoose.model("user", UserSchema, collectionName);
    
    module.exports = User;