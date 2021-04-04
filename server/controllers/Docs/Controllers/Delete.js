// add models
const Docs = require('../../../models/Docs');
const Path = require('../../../models/Paths');


module.exports = ( req , res ) => {

    Docs.deleteOne({ _id : req.body.doc_id }).then( deleteDocsResult => {

        Path.updateOne({ _id : req.body.path_id },{ 

            $pull : { docs : req.body.doc_id }

         }).then( updatePathResult => {

            res.status(200).json({

                code : 200 , 
    
                message : "docs is deleted"
    
            });

         } ).catch( error => {

            res.status(400).json(error);

        } )

    } ).catch( error => {

       res.status(200).json( error );

    } );

} 