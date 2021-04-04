// add dependencies
const router = require('express').Router();


// add controllers
const PathController = require('../controllers/Path/Index');


// add middleware
const AuthenticateToken = require('../middlewares/authenticateToken');



// fetch single section GET method => fetch one of path with authorization header and header ( JWT Token )
router.get('/fetch-single' , AuthenticateToken , PathController.GetFetchSingle );



// fetch all section GET method => fetch all of path with authurization header ( JWT Token )
router.get('/fetch-all', AuthenticateToken , PathController.GetFetchAll );



// create section POST method => create a path with authorization header ( JWT Token ) and body
router.post('/create', AuthenticateToken , PathController.PostCreate );



// update section PUT method => update a path with authorization header ( JWT Token ) and path id with body
router.put('/update', AuthenticateToken , PathController.PutUpdate );



// delete section DELETE method => delete a path with authorization header ( JWT Token ) and id
router.delete('/delete', AuthenticateToken , PathController.Delete );



module.exports = router ;