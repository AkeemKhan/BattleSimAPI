// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var port = process.env.PORT || 8000;        // set our port

app.use('/api', require("./routes/api"));
app.listen(port); // Start the Server
console.log('Magic happens on port ' + port);
