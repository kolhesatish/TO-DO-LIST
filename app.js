//jshint esversion:6

const express = require("express");
const parser = require("body-parser");


const app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workList = [];

app.get("/", function(req, res){
    let today = new Date();

    let options = {
        weekday :"long",
        day : "numeric",
        month : "long"
    };
    let day = today.toLocaleDateString("en-us", options);
    res.render("list", {listTitle: day, newItemList: items});
});

app.post("/", function(req, res){
    let item = req.body.newItem;
    if(req.body.list == "Work"){
        workList.push(item);
        res.redirect("/work");
    }else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", newItemList: workList});
});

app.post("/work", function(req, res){

    let item = req.body.newItem;
    workList.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res){
    res.render("about");
});
app.listen(3000, function(){
    console.log("Server has started 3000");
});


