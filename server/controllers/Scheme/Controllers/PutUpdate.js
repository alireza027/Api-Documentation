// add dependencies
const moment = require('moment');



// add models
const Schemes = require('../../../models/Schemes');

module.exports = ( req , res ) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        req.body.updated_at = moment( new Date() ).format(" YYYY-MM-DD HH:mm:ss ");

        Schemes.updateOne({ _id : req.body.scheme_id },req.body).then( updateSchemeResult => {

            res.status(200).json({

                code : 200 , 

                message : "scheme is updated"

            })

        } ).catch( error => {

            res.status(400).json(error);

        } )

    }

}