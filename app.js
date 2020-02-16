const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
    console.log(req);
})

app.post("/",function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
            email_address: email,
            /*status: "subscribed",*/
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
                },
            update_existing: true
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/280af3caa7",
        method: "POST",
        /*headers: {
            "Authorization": "whatever 0f167c50c2e510ef2c917f1ecdb71b08-us4"
        },*/
        body: jsonData
    };  

    request(options, function(error, response, body){
        if(response.statusCode != 200){
            res.sendFile(__dirname+"/failure.html");
            console.log(error);
        }
        else{
            res.sendFile(__dirname+"/success.html");
            console.log(response);
        }
    });
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

var server = app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});