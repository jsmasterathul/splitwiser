//var deepPopulate = require('mongoose-deep-populate');
var User = require("../models/user");
var _ = require("lodash");

exports.getUser = function (req, res) {
    console.log("Got the id", req.query.userId);
    var result;

    User
        .findById(req.query.userId)
        .then((user) => {
            result = user;
            result = result.toObject();
            return user.friends;
        })
        .then((friends) => {
            console.log(friends);

            return new Promise((resolve, reject) => {
                
                friends.forEach((friend, index) => {

                    User.findById(friend._id, (err, friendDetails) => {
                       result.friends[index].name = friendDetails.name;
                                     
                       if(index == (friends.length-1)){
                         resolve(result);
                       }
                    });
                })
               // console.log("Last",result);
               
            });


           
        })
        .then((result) => {
             res.json(result);
        })
        .catch((err) => {
            res.json(err);
        })
    /*.exec((err,user) =>{
                if(err){
                    res.status(500).json({"error": err});;
                }
                res.json(user);
            });*/


}

//add a user
exports.addUser = function (req, res) {
    var name = req.body.name;
    var user = new User({ name: req.body.name });
    user.save((err, user) => {
        if (err) {
            res.send("error");
        }
        else {
            res.send('Got a POST request');
        }
    });

}

//add a friend
exports.addFriend = function (req, res) {

    var userId = req.body.userId;
    var friendId = req.body.friendId;

    User.findById(userId, (err, user) => {

        User.findById(friendId, (err, friend) => {
            user.friends.push(friend);
            //user.save();
            user.save((err, updatedUser) => {
                if (err) {
                    res.send("Error");
                }
                res.send('Got a POST friend request');
            });

        });


    });
}