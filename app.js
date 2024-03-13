const express=require('express');
const bodyParser=require('body-parser');
const req=require('request');
const date=require(__dirname+"/date.js");
const mongoose=require('mongoose');
//console.log(date())
const app=express()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var path = require('path');
var workItems=[];
//var workItems=[];
var items=["buy food","Cook food","eat food"]
app.set('views', path.join(__dirname, 'views'));


app.set('view engine','ejs');

//const ejsLint = require('ejs-lint');
app.get("/",function(req,res){
    let day=date.getDay();
    res.render("list.ejs",{listTitle:day,newlistItems:items});
   
})
//scope problem then we take list items
app.post("/",function(req,res){
    let item=req.body.newItem;
    if(req.body.list=="Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
  let item=req.body.newItem;
  items.push(item);

  res.redirect("/");
    }
})
app.get("/work",function(req,res){
    res.render("list.ejs",{listTitle:"Work List",newlistItems:workItems});
});
app.post("/work",function(req,res){
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/");

})

app.listen(3000,function(){
    console.log("port started");
})
