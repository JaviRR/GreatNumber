var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var text2, color2, restart = false;

var app = express();
var number = Math.floor((Math.random()*100) + 1);
// EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Session
app.use(session({
    secret: "TupacShakur",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000 }
}))


app.get("/", function(req, res){
    if(req.session.num){
        console.log("inserted number", req.session.num);
        console.log("number to guess", number);
        if(restart){
            restart = false;
            color2= "";
            text2 = "";
        }else if(req.session.num < number){   //Number is less than inserted
            color2 = "red";
            text2 = "Too low!"
        }else if(req.session.num > number){  //Number is greater than inserted
            color2 = "red";
            text2 = "Too high!"
        }else if(req.session.num == number){ //Number is the number inserted
            color2 = "green";
            text2 = number+" was the number!"
        }
    }
    res.render("index", {color: color2, text: text2});
})

app.post("/process", function(req, res){
    req.session.num = Number(req.body.number);
    res.redirect('/');
})

app.get("/restart", function(req, res){
    number = Math.floor((Math.random()*100) + 1);
    restart = true;
    res.redirect("/");
})

app.listen(8000, function(){
    console.log("Listening on port 8000");
})