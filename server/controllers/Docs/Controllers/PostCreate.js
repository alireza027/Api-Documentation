// add dependencies
const moment = require('moment');


// add models
const Docs = require('../../../models/Docs');
const Path = require('../../../models/Paths');


module.exports = ( req , res ) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        req.body.paths = req.body.path_id ; 

        new Docs( req.body ).save().then( createDocsResult => {

            Path.updateOne( {

                _id : req.body.path_id , 

            } , { 

                $push : { docs : createDocsResult._id } , 

                updated_at : moment( new Date() ).format(" YYYY-MM-DD HH:mm:ss ")

            } ).then( updateDocument => { 

                res.status(201).json({

                    code : 201 , 

                    message : "Create New doc"

                })

            } ).catch( error => {

                res.status(400).json( error );

            } );

        } ).catch( error => {

            res.status(400).json( error );

        } );

    }

}