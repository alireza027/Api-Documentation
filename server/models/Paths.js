// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// create users schema with new Mongoose.schema

const PathSchema = new Schema({

    title : {

        type : String , 

        required : [ true , " Title field is required. " ] ,

        minLength : [ 3 , " Title field must be more than 3 characters " ] ,

        maxLength : [ 40 , " Title field must be less than 40 characters " ] ,

        trim : true

    } , 

    description : {

        type : String , 

        trim : true ,

    } , 

    route : {

        type : String , 

        required : [ true , " Route field is required. " ] , 

        minLength : [ 3 , " Route field must be more than 3 characters "] , 

        maxLength : [ 100 , " Route field must be less than 100 characters "] , 

        trim : true

    } ,

    documentation : { 
        
        type : Schema.Types.ObjectId , 
        
        ref : "documentations"
    
    } , 

    docs : [ { 
            
        type : Schema.Types.ObjectId , 
        
        ref : "docs" 
        
    } ] ,

    created_at: {

        type: String,

        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

    } ,

    updated_at: {

        type: String,

        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

    }

})



// export and create new 
module.exports = mongoose.model('paths',PathSchema);