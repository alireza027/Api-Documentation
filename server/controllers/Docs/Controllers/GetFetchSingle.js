// add models
const Docs = require('../../../models/Docs');


module.exports = ( req , res ) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        Docs.findOne({ _id : req.body.doc_id }).populate("paths").then( fetchSingleDocsResult => {

            if( fetchSingleDocsResult == null ){

                res.status(200).json({})

            } else {

                res.status(200).json( fetchSingleDocsResult );
            }

        } ).catch( error => {

            res.status(400).json( error );

        } )

    }

};