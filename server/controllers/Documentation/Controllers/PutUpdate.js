// add dependencies
const moment = require('moment');



// add models
const Documentation = require('../../../models/Documentations');


module.exports = (req,res) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        req.body.updated_at = moment( new Date() ).format(" YYYY-MM-DD HH:mm:ss ");

        Documentation.updateOne( { _id : req.body.document_id , author : req.user._id }, req.body ).then( updateSingleDocumentation => {

            res.status(200).json({

                code : 200 , 
                
                message : "docment is updated",

            })

        } ).catch( error => {

            res.status(400).json( error );

        } )

    }

};