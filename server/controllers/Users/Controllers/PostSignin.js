// add dependencies
const crypto = require('crypto');


// add models
const Users = require('../../../models/Users');


// add middleware
const GenerateAccessToken = require('../../../middlewares/generateAccessToken');


module.exports = (req,res)=>{

    if( req.body.email == null || req.body.password == null ){

        res.status(400).json({

            code : 400 , 

            message : "email and password is required"

        })

    } else {

        Users.findOne({ email : req.body.email , password :  crypto.createHash('sha256',process.env.PASSWORD_SECRET_KEY).update(req.body.password).digest('hex') }).then( signinResult => {

            if( signinResult == null ) {
    
                res.status(400).json({
    
                    code : 400 , 
    
                    message : " username or password is wrong!!!! "
    
                });
    
            } else {
    
                const token = GenerateAccessToken( signinResult._id , signinResult.email , signinResult.password );
    
                res.status(200).json({
    
                    code : 200 , 
    
                    message : "sign in user" , 
    
                    token : `Bearer ${token}`
    
    
                });
    
            }
    
        } ) .catch( error => {
    
            res.status(400).json(error);
    
        } )

    }

} ;