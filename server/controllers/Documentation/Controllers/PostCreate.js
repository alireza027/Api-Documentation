// add dependencies
const moment = require('moment');



// add models
const Documentation = require('../../../models/Documentations');
const Users = require('../../../models/Users');


module.exports = (req,res) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        req.body.author = req.user._id;

        new Documentation(req.body).save().then(createDocumentResult => {

            Users.updateOne({ _id : req.user._id },{

                $push : { documentations : createDocumentResult._id } , 

                updated_at : moment( new Date() ).format(" YYYY-MM-DD HH:mm:ss ")

            }).then(userUpdateResult => {

                res.status(200).json({

                    code : 200 , 
    
                    message : "create new document"
    
                })

            } ).catch(error => {

                res.status(400).json( error );

            } )

        } ).catch(error => {

            res.json(error);

        } )

    }

};