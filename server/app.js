// add or import third party dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();



// add routes
const DocumentationRoute = require('./routes/documentations');
const DocsRoute = require('./routes/docs');
const PathsRoute = require('./routes/path');
const SchemeRoute = require('./routes/scheme');
const UsersRoute = require('./routes/users');



// use dependencies
app.use(cors());
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan(":remote-addr  - :method - :status - :url - :response-time ms - :user-agent"));


// use route
app.use('/documentation',DocumentationRoute);
app.use('/doc',DocsRoute);
app.use('/path',PathsRoute);
app.use('/scheme',SchemeRoute);
app.use('/auth',UsersRoute);


// connect to mongoose
mongoose.connect(process.env.MONGO_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {

    console.log("Connect to API db");

}).catch(err => {

    console.log("you have some error in Hozh API db: ", err);

})


// listen port
app.listen(process.env.PORT,(error)=>{

    if(error) console.log(error);

    console.log(`Listening in the ${process.env.PORT} port`);

})