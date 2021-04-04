// add dependencies
const moment = require('moment');


// add models
const Path = require('../../../models/Paths');


module.exports = ( req , res ) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        req.body.updated_at = moment( new Date() ).format(" YYYY-MM-DD HH:mm:ss ");

        Path.updateOne({ _id : req.body.path_id },req.body).then( updatePathResult => {

            res.status(200).json({

                code : 200 , 

                message : "path is updated"

            })

        } ).catch( error => {

            res.status(400).json(error);

        } )

    }

}