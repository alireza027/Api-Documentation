// add dependencies
const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

// create users schema with new Mongoose.schema

const UsersSchema = new Schema({

    name : {

        type : String,

        trim : true,

        minLength : [3,"Your name must be more than 3 characters long"],

        maxLength : [20,"your name must be less than 15 characters long"],

    },

    family : {

        type : String,

        trim : true,

        minLength : [3,"Your family must be more than 3 characters long"],
        
        maxLength : [20,"your family must be less than 15 characters long"],

    },

    email : {

        type : String,

        unique : [true, "Your email must be unique"],

        required : [true,"Email require field"],

        minLength : [5,"Your email must be more than 5 characters long"],

        trim : true,

        validate: {

            validator: function ( email ) {

                return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));

            },

            message: props => `${props.value} is not a valid email format `
        }

    },

    password : {

        type : String,

        trim : true,

        minLength : [8,"Your password must be more than 8 characters"],

        required : [true,"Password require field"] , 

    },

    documentations : [{ 
        
        type : Schema.Types.ObjectId , 
        
        ref : "documentations" 
    
    }],

    created_at: {

        type: String,

        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

    },

    updated_at: {

        type: String,

        default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

    }

})


// export and create new user
module.exports = mongoose.model('users',UsersSchema);