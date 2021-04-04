// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// create users schema with new Mongoose.schema
const DocsSchema = new Schema({

    title : {

        type : String , 

        required : [ true , " Title field is required. " ] ,

        minLength : [ 3 , " Title field must be more than 3 characters " ] ,

        maxLength : [ 40 , " Title field must be less than 40 characters " ] ,

        trim : true

    } , 


    sub_title : {

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


    full_route : {

        type : String ,

        trim : true , 

        // validate: {

        //     validator: function ( route ) {

        //         return (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(route));

        //     },

        //     message: props => `${props.value} is not a valid route address format `
        // } , 

        required : [ true , " Route field is required. " ]

    } ,


    method : {

        type : String , 

        required : [ true , " Method field is requierd. " ] ,

        minLength : [ 2 , " Method field must be more than 2 characters " ] ,

        maxLength : [ 12 , " Method field must be less than 12 characters " ]
 
    } ,


    parameters : {

        type : Array , 

        required : [ true , " Parameters field is required. " ] ,

        // { id : "-" , name : "-" , data_type : "-" , description : "-" , example : "-" }

    } , 


    headers : {

        type : Array , 

        // { id : "-" , name : "-" , value : "" , description : "" }

    } , 


    responses : {

        type : Array , 

        // { id : "-" , name : "-" , body : "" }

    } , 
    

    paths : [{

        type : Schema.Types.ObjectId , 

        ref : "paths"

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
module.exports = mongoose.model('docs',DocsSchema);