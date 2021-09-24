const express= require("express");
const app=express();
const https=require("https");
const { dirname } = require("path");

    // var express = require('express');
var path = require('path');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.css");
});
app.post("/",function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var data = {
        members :[
                    {
                        email_address :email,
                        status:"subscribed",
                        merge_fields :{
                            FNAME : fname,
                            LNAME: lname
                        }
                    }
                ]
            };


            const jsondata = JSON.stringify(data);
            const url="https://us6.api.mailchimp.com/3.0/lists/ed363dd6eb"
            const options = {
                method : "POST",
                auth:"shyam:b7a3887bc983a2d4a18c83f655e452cc-us6"
            }
            const request=https.request(url,options,function(response){
                if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");}
                else{
                    res.sendFile(__dirname+"/failure.html");
                }    

                response.on("data",function(data){
                    console.log(JSON.parse(data))
                });
        
            });

            request.write(jsondata)
            request.end();
});
app.post("/failure",function(req,res){
 res.redirect("/");
})


app.listen(3000,function(){
    console.log("server is runnning");
});