const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema basique
const Comment = new Schema({
    username: String,
    text: String,
    create_at : {
        type:Date, 
        default: new Date()
    }
});

const CommentModel = mongoose.model('Comment', Comment);

module.exports = CommentModel;
