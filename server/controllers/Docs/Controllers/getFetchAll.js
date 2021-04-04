// add models
const Docs = require('../../../models/Docs');


module.exports = ( req , res ) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        var page = req.body.page == null ? 1 : Number(req.body.page) > 0 ? Number(req.body.page) : 1 ;

        var count = req.body.count == null ? 12 : Number(req.body.count) > 0 ? Number(req.body.count) : 12 ;

        Docs.find({ paths : req.body.path_id }).skip( ( page - 1 ) * count ).limit( count ).populate("paths").then( fetchAllSchemeResult => {

            if( fetchAllSchemeResult == null ){

                res.status(200).json({});

            } else {

                res.status(200).json(fetchAllSchemeResult);

            }

        } ).catch(error => {

            res.status(400).json(error);

        } )

    }

}