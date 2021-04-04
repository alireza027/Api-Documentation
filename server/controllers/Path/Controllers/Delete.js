// add models
const Path = require('../../../models/Paths');



module.exports = ( req , res ) => {

    Path.deleteOne({ _id : req.body.path_id }).then( deletePath => {

        res.status(200).json({

            code : 200 , 

            message : "path is deleted"

        });

    } ).catch( error => {

       res.status(200).json( error );

    } );

} 