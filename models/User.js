const { Schema, model } = require('mongoose');
const {isEmail} = require('validator');


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return isEmail(v);
      }
    }
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
},
{
toJSON: {
  virtuals: true
}
}
);
// virtual
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = model('User', userSchema);
module.exports = User;