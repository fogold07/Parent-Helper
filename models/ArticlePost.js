const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema basique
const ArticlePostSchema = new Schema({
    title: String,
    category: String,
    content: String,
    author: String,
    create_at : {
        type:Date, 
        default: new Date()
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const ArticlePost = mongoose.model('ArticlePost', ArticlePostSchema);

module.exports = ArticlePost;
