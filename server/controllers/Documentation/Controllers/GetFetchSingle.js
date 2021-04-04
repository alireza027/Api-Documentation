// add models
const Documentation = require('../../../models/Documentations');


module.exports = (req,res) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        Documentation.findOne({ _id : req.params.document_id }).populate("author").populate("schemes").populate({ path : 'paths' , populate : { path : 'docs' } }).then( fetchSingleDocumentationResult => {

            if(fetchSingleDocumentationResult === null) {

                res.status(400).json({

                    code : 400 , 

                    message : "this document not exists"

                })

            } else {

                res.status(200).json( fetchSingleDocumentationResult );

            }


        } ).catch( error => {

            res.status(400).json(error);

        } )

    }

};