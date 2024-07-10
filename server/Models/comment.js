const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    reply: {type: Schema.Types.ObjectId, ref: "Posts"},
    text: {type: String, required: true},
    link: {type: String, required: true},
    video: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    pics: [],
    likes: [
        {user: {type: Schema.Types.ObjectId, ref: "Users"}}
    ],
});

module.exports = mongoose.model('Comments', commentSchema);