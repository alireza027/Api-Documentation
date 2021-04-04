// add dependencies
const router = require('express').Router();


// add controller
const UserController = require('../controllers/Users/Index');


// add middleware
const AuthenticateToken = require('../middlewares/authenticateToken');


// login section GET method => fetch user data with authorization header ( JWT Token )
router.get('/signin' , AuthenticateToken , UserController.GetSignin );


// login section POST method => login user with email and password and create new JWT Token
router.post('/signin' , UserController.PostSignin );


// register section POST method => create new user
router.post('/signup' , UserController.PostSignup );


// update user section PUT method => update user with authorization header ( JWT Token )
router.put('/update-user' , AuthenticateToken , UserController.PutUpdateUser );


module.exports = router ;