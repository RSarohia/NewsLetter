const express = require('express');
const bodyParser = require('body-parser');
const request = require('requests');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

var server = app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});