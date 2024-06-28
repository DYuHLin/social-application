const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    text: {type: String, required: true},
    link: {type: String, required: true},
    video: {type: String, required: true},
    pics: [],
    likes: [
        {user: {type: Schema.Types.ObjectId, ref: "Users"}}
    ],
});

module.exports = mongoose.model('Posts', userSchema);