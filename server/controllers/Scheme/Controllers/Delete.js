// add models
const SchemesMod = require('../../../models/Schemes');
const Documentation = require('../../../models/Documentations');


module.exports = ( req , res ) => {

    SchemesMod.deleteOne({ _id : req.body.scheme_id }).then( deleteSchemeResult => {

        Documentation.updateOne({ _id : req.body.document_id },{ 

            $pull : { schemes : req.body.scheme_id }

         }).then( updateDocumentResult => {

            res.status(200).json({

                code : 200 , 
    
                message : "scheme is deleted"
    
            });

         } ).catch( error => {

            res.status(400).json(error);

        } )

    } ).catch( error => {

       res.status(200).json( error );

    } );

} 