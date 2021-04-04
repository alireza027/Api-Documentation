// add dependencies
const router = require('express').Router();


// add controllers
const DocumentationController = require('../controllers/Documentation/Index');


// add middleware
const AuthenticateToken = require('../middlewares/authenticateToken');



// fetch single section GET method => fetching single document with id
router.get('/fetch-single/:document_id' , AuthenticateToken , DocumentationController.GetFetchSingle ) ;


// fetch all section GET method => fetching all document with authorization header
router.get('/fetch-all' , AuthenticateToken , DocumentationController.GetFetchAll ) ;


// create section POST method => create new document with authorization header and body
router.post('/create' , AuthenticateToken , DocumentationController.PostCreate ) ;


// update section PUT method => update document with authorization header and body
router.put('/update' , AuthenticateToken , DocumentationController.PutUpdate ) ;


// delete section DELETE method => delete document with authorization header
router.delete('/delete' , AuthenticateToken , DocumentationController.Delete ) ;


module.exports = router ;