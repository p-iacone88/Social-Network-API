const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min_length: 1,
    max_length: 280
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(v) {
      // format date
      return v;
    }
  }, 
  username: {
    type: String,
    required: true
  }, 
  reactions: [{

  }],
})