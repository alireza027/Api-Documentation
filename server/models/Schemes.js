// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// create users schema with new Mongoose.schema
const ApiScheme = new Schema({


    title : {

        type : String , 

        required : [ true , " Title field is required. " ] ,

        // minLength : [ 3 , " Title field must be more than 3 characters " ] ,

        // maxLength : [ 40 , " Title field must be less than 40 characters " ] ,

        trim : true

    } , 


    description : {

        type : String ,

        trim : true ,

    } ,

    
    summary : {

        type : String , 

        trim : true ,

        // minLength : [ 3 , "Summary field must be more than 3 characters" ]

    } ,

    
    documentation : { 
        
        type : Schema.Types.ObjectId , 
        
        ref : "documentations" 
    
    } , 

    fields : {

        type : Array , 

        required : [ true , " Fields is required filed " ] , 

        // { id : "-" , name : "-" , data_type : "-" , description : "-" , example : ""  }

    } ,

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
module.exports = mongoose.model('schemes',ApiScheme);