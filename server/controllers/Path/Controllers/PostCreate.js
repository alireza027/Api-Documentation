// add dependencies
const moment = require('moment');


// add models
const Path = require('../../../models/Paths');
const Documentation = require('../../../models/Documentations');


module.exports = ( req , res ) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        req.body.documentation = req.body.document_id ; 

        new Path( req.body ).save().then( createPathResult => {

            Documentation.updateOne( {

                _id : req.body.document_id , 

            } , { 

                $push : { paths : createPathResult._id } , 
                
                updated_at : moment( new Date() ).format(" YYYY-MM-DD HH:mm:ss ")

            } ).then( updateDocument => { 

                res.status(201).json({

                    code : 201 , 

                    message : "Create New Path"

                })

            } ).catch( error => {

                res.status(400).json( error );

            } );

        } ).catch( error => {

            res.status(400).json( error );

        } );

    }

}