var User = require("../models/user");
var Bill = require("../models/bill");
var _ = require("lodash");

exports.addBill = function(req,res){
 let payer = [];
 let payee = [];


//get the bill in the same format as the models
var bill = new Bill();
 _.assign(bill,req.body);
bill.save((err,bill) => {
    if(err){
        res.send(err);
    }
    else{
        res.send("bill has been added");
    }
});


//update the friends property in user model

}