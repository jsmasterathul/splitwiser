var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/splitwiser');

var User = require("./models/user");
var bill = require("./models/bill");

var billRoutes = require("./routes/billRoutes");
var userRoutes = require("./routes/userRoutes");


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

 // Use native promises
mongoose.Promise = global.Promise;

/*var myLogger = function (req, res, next) {
  console.log('LOGGED',req)
  next()
}

app.use(myLogger);*/
//get user
app.get('/user',userRoutes.getUser);

//add a user
app.post('/user', userRoutes.addUser);

//add friends
app.post("/user/addfriend",userRoutes.addFriend);




//add a new bill
app.post("/bill/addbill",billRoutes.addBill);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});