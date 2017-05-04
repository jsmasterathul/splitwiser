var mongoose = require('mongoose');
var _ = require("lodash");
var user = require("./user");
var Schema = mongoose.Schema;

var billSchema = new Schema({
    raisedBy: { type: Schema.Types.ObjectId, ref: 'Person' },
    paidBy: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'Person' },
            amount: Number
        }
    ],
    participants: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'Person' },
            owe: [{
                user: { type: Schema.Types.ObjectId, ref: 'Person' },
                amount: Number
            }
            ]

        }
    ],
    paidDate: { type: Date, default: Date.now },
    description: String

});

billSchema.post('save', function (doc) {
    // console.log("Inside pre save", doc.paidBy);

    doc.participants.forEach((participant) => {
        user.findById(participant.user).then(function (resultUser) {

            //save the bills involved
            resultUser.billsInvolved.push(doc);
            resultUser.save().then(function (user) {
                console.log("Bill saved for the user involved");
            });
            participant.owe.forEach(function (owee) {
                console.log("result user", resultUser._id, "Owee", owee.user);
                if (!resultUser._id.equals(owee.user)) {
                    //console.log(resultUser.friends.findById(owee.user)); //resultUSer
                    resultUser.friends.forEach((friend) => {
                        if (friend._id.equals(owee.user)) {
                            console.log("final check %s", resultUser.name);
                            friend.amount += owee.amount;
                        }
                    });
                    resultUser.save().then(function (user) {
                        console.log("Finally saved");
                    });
                }
            })
        });





    });



    // next();
});

var Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;