// add models
const Schemes = require('../../../models/Schemes');


module.exports = ( req , res ) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        Schemes.findOne({ _id : req.body.schemes_id }).populate("documentation").then( fetchSingleSchemesResult => {

            if( fetchSingleSchemesResult == null ){

                res.status(200).json({})

            } else {

                res.status(200).json( fetchSingleSchemesResult );
            }

        } ).catch( error => {

            res.status(400).json( error );

        } )

    }

};