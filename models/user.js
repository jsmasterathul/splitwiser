var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deepPopulate = require('mongoose-deep-populate')(mongoose);


var userSchema = new Schema({
  name : "String",
  //billPayer : [{type: Schema.Types.ObjectId, ref: 'Bill'} ],
  billsInvolved : [{type: Schema.Types.ObjectId, ref: 'Bill'}],
  friends : [
      {
          id : {type: Number, ref: 'User'},
          amount : Number
         
      }
  ]
});

userSchema.plugin(deepPopulate,{
    populate : {
        'friends._id' : {
            select: 'name'
        }
    }
});


var User = mongoose.model("User",userSchema);

module.exports = User;
