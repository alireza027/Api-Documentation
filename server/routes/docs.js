// add dependencies
const router = require('express').Router();


// add controllers
const DocsController = require('../controllers/Docs/Index');


// add middleware
const AuthenticateToken = require('../middlewares/authenticateToken');



// fetch single section GET method => fetch one of doc with authorization header and header ( JWT Token )
router.get('/fetch-single' , AuthenticateToken , DocsController.GetFetchSingle );



// fetch all section GET method => fetch all of doc with authurization header ( JWT Token )
router.get('/fetch-all', AuthenticateToken , DocsController.GetFetchAll );



// create section POST method => create a doc with authorization header ( JWT Token ) and body
router.post('/create', AuthenticateToken , DocsController.PostCreate );



// update section PUT method => update a doc with authorization header ( JWT Token ) and doc id with body
router.put('/update', AuthenticateToken , DocsController.PutUpdate );



// delete section DELETE method => delete a doc with authorization header ( JWT Token ) and id
router.delete('/delete', AuthenticateToken , DocsController.Delete );



module.exports = router ;