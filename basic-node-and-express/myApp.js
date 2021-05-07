var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(function(req, res, next){
  console.log(req.method + ' ' + req.path + ' - ' + req.ip); 
  next();
  });

app.get("/now", 
function(req, res, next){
  req.time = new Date().toString();
  next();
  },
  function(req, res){
  res.send({time: req.time});
  });

app.get("/:word/echo", function(req, res) {
  const {word} = req.params;
  res.json({echo: word});
});

app.route("/name").get( (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last;
  var full = {name: firstName + " " + lastName};
  res.json(full);
}).post();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/name", (req, res) => {
  var full = req.body.first + " " + req.body.last;
  res.json({name: full});
});

app.get("/json", (req,res) => {
  if(process.env.MESSAGE_STYLE === "uppercase") {
    res.json({"message" : "HELLO JSON"});
  }
  res.json({"message" : "Hello json"});
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.use("/public", express.static(__dirname + "/public"));
console.log("Hello World");


































 module.exports = app;
