// add controller
const GetFetchSingle = require('./Controllers/GetFetchSingle');
const GetFetchAll = require('./Controllers/GetFetchAll');
const PostCreate = require('./Controllers/PostCreate');
const PutUpdate = require('./Controllers/PutUpdate');
const Delete = require('./Controllers/Delete');

module.exports = {

    GetFetchSingle : GetFetchSingle , 

    GetFetchAll : GetFetchAll , 

    PostCreate : PostCreate , 

    PutUpdate : PutUpdate , 

    Delete : Delete , 

}