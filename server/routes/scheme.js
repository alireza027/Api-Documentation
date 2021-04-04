// add dependencies
const router = require('express').Router();


// add controllers
const SchemeController = require('../controllers/Scheme/Index');


// add middleware
const AuthenticateToken = require('../middlewares/authenticateToken');



// fetch single section GET method => fetch one of scheme with authorization header and header ( JWT Token )
router.get('/fetch-single' , AuthenticateToken , SchemeController.GetFetchSingle );



// fetch all section GET method => fetch all of scheme with authurization header ( JWT Token )
router.get('/fetch-all', AuthenticateToken , SchemeController.GetFetchAll );



// create section POST method => create a scheme with authorization header ( JWT Token ) and body
router.post('/create', AuthenticateToken , SchemeController.PostCreate );



// update section PUT method => update a scheme with authorization header ( JWT Token ) and scheme id with body
router.put('/update', AuthenticateToken , SchemeController.PutUpdate );



// delete section DELETE method => delete a scheme with authorization header ( JWT Token ) and id
router.delete('/delete', AuthenticateToken , SchemeController.Delete );



module.exports = router ;