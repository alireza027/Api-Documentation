// add controller
const GetSignin = require('./Controllers/GetSignin');
const PostSignin = require('./Controllers/PostSignin');
const PostSignup = require('./Controllers/PostSignup');
const PutUpdateUser = require('./Controllers/PutUpdateUser');


module.exports = {

    GetSignin : GetSignin , 

    PostSignin : PostSignin , 

    PostSignup : PostSignup , 

    PutUpdateUser : PutUpdateUser

} ;