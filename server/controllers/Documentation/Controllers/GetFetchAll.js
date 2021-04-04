// add models
const Documentation = require('../../../models/Documentations');


module.exports = (req,res) => {

    if( req.errorForbidden == "Forbidden" || req.errorUnauthorized == "Unauthorized" || req.user == null ) {

        res.status(401).json({

            code : 401 , 

            message : "Unauthorized" , 

        })

    } else {

        var page = req.body.page == null ? 1 : Number(req.body.page) > 0 ? Number(req.body.page) : 1 ;

        var count = req.body.count == null ? 12 : Number(req.body.count) > 0 ? Number(req.body.count) : 12 ;

        Documentation.find({author : req.user._id }).skip( ( page - 1 ) * count ).limit(count).populate("author").populate("schemes").populate({ path : 'paths' , populate : { path : 'docs' } }).then(fetchAllDocumentResult => {

            res.status(200).json(fetchAllDocumentResult);

        } ).catch( error => {

            res.status(400).json(error);

        } )

    }
            
};