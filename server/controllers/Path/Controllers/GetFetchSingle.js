// add models
const Path = require('../../../models/Paths');


module.exports = ( req , res ) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        Path.findOne({ _id : req.body.path_id }).populate("docs").populate("documentation").then( fetchSinglePathResult => {

            if( fetchSinglePathResult == null ){

                res.status(200).json({})

            } else {

                res.status(200).json( fetchSinglePathResult );
            }

        } ).catch( error => {

            res.status(400).json( error );

        } )

    }

};