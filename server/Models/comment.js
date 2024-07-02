const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    reply: {type: Schema.Types.ObjectId, ref: "Posts"},
    text: {type: String, required: true},
    likes: [
        {user: {type: Schema.Types.ObjectId, ref: "Users"}}
    ],
});

module.exports = mongoose.model('Comments', userSchema);