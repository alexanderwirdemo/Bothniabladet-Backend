const mongoose = require("mongoose");

const AdvancedSearchSchema = new mongoose.Schema(
    {
        advanced_searchString : {type: [String]},
        advanced_searchTitle: {type: String},
        advanced_searchCategory: {type: [String]},
        advanced_searchSubcategory: {type: [String]},
        advanced_searchPhotografer: {type: String},
        advanced_searchResolution: {type: Number},
        advanced_searchPlace: {type: String},
        advanced_searchPublished: {type: String},
        advanced_searchDateFrom: {type: Date},
        advanced_searchDateTo: {type: Date},
    });

    AdvancedSearchSchema.index( { keywords: 1 } );
    var collectionName = "advancedSearch";
    const AdvancedSearch = mongoose.model("advancedSearch", AdvancedSearchSchema, collectionName);
    
    module.exports = AdvancedSearch;