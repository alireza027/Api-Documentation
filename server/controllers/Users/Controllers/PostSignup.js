// add dependencies
const crypto = require('crypto');


// add models
const Users = require('../../../models/Users');


module.exports = (req,res)=>{

    if( req.body.email == null || req.body.password == null ){

        res.status(400).json({

            code : 400 , 

            message : "email and password is required field"

        })

    } else {

        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(req.body.password)) {

            req.body.password = crypto.createHash('sha256',process.env.PASSWORD_SECRET_KEY).update( req.body.password ).digest('hex');
    
            // create new user
            new Users(req.body).save().then(signupResult=>{
    
                res.status(201).json({
    
                    code : 201 , 
            
                    message : "create new user"
            
                })
    
            }).catch( error => {
    
                error.code == 11000 ? res.status(400).json({
    
                    code : 400 , 
    
                    message : "Your email has already been used"
    
                }) : res.status(400).json(error.errors);
    
            })
    
        } else {
    
            res.status(400).json({
    
                code : 400 , 
    
                message : "Your password must be used to a-z A-Z 0-9 and more than 8 characters"
    
            })
    
        }

    }

} ;