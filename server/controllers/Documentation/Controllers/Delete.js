// add models
const Documentation = require('../../../models/Documentations');
const Users = require('../../../models/Users');
const Path = require('../../../models/Paths');


module.exports = (req,res) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        Documentation.deleteOne({

            _id : req.body.document_id , 

            author : req.user._id

        }).then( deleteDocumentResult => {

            Users.updateOne({ _id : req.user._id } , { $pull : { documentations : req.body.document_id } }).then( updateUserResult => {

                Path.deleteMany({ documentation : req.body.document_id }).then( deletePathResult => {

                    res.status(200).json({

                        code : 200 , 

                        message : "document is deleted with path and update in then user"

                    })

                } )

            } )

        } ).catch( error => {

            res.status(400).json(error);

        } )

    }

};