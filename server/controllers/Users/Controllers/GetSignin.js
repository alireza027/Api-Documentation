// add models
const Users = require('../../../models/Users');


module.exports = (req,res)=>{


    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        Users.findOne({ _id : req.user._id }).populate("documentations").then( signinResult => {

            res.status(200).json(signinResult);

        } ).catch( error => {

            res.status(400).json(error);

        } )

    }

} ;