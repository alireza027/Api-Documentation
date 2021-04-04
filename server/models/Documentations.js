// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// create api documentation schema with new Mongoose.schema
const DocumentationSchema = new Schema({

    title : {

        type : String ,

        minLength : [ 3 , " Your title must be more than 2 characters long. " ] ,

        maxLength : [ 80 , " Your family must be less than 80 characters long. " ] ,

        required : [ true , " Title filed is required. "]

    } ,

    version : {

        type : String , 

        maxLength : [ 15 , " Your family must be less than 15 characters long. " ] ,

    } ,

    description : {

        type : String , 

        minLength : [ 10 , " Your description must be more than 10 characters long. " ] ,

        maxLength : [ 1000 , " Your description must be less than 1000 characters long. " ] ,

        required : [ true , " Description filed is required. "]

    } , 

    disabled : {

        type : Boolean ,

        default : false , 

    } , 

    author : { 
        
        type : Schema.Types.ObjectId , 
        
        ref : "users" 
    
    } ,

    paths : [{ 
        
        type : Schema.Types.ObjectId , 
        
        ref : "paths" 
    
    }],
    
    schemes : [{ 
        
        type : Schema.Types.ObjectId , 
        
        ref : "schemes" 
    
    }] ,

    created_at: {

        type : String,

        default : moment( new Date() ).format(" YYYY-MM-DD HH:mm:ss ")

    },

    updated_at: {

        type: String,

        default : moment( new Date() ).format(" YYYY-MM-DD HH:mm:ss ")

    }

    
})


// export and create new 
module.exports = mongoose.model('documentations',DocumentationSchema);