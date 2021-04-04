// add dependencies
const moment = require('moment');


// add models
const Users = require('../../../models/Users');


module.exports = (req,res)=>{

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        req.body.updated_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        Users.updateOne({ _id : req.user._id } , req.body ).then(usersResponse=>{

            res.status(200).json({

                code : 200 , 

                message : "Update user"

            })

        }).catch( error => {

            res.status(400).json(error)

        } )

    }

} ;