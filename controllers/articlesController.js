const ArticlePost = require("../models/ArticlePost");

// article_index, article_details, article_create_get, article_create_post, article_delete, comment_create_get, comment_create_post
const article_index = async (req, res) => {
    const articleposts = await ArticlePost.find().sort({ _id: -1 });
    if (req.session.user) {
        res.render('articles/articles', { user: req.session.user, articleposts });
    } else {
        res.render('articles/articles', { articleposts });
    }
}

const vieDeFamille_index = async (req, res) => {
    const articleposts = await ArticlePost.find().sort({ _id: -1 });
    if (req.session.user) {
        res.render('articles/viefamille', { user: req.session.user, articleposts });
    } else {
        res.render('articles/viefamille', { articleposts });
    }
}

const communication_index = async (req, res) => {
    const articleposts = await ArticlePost.find().sort({ _id: -1 });
    if (req.session.user) {
        res.render('articles/communication', { user: req.session.user, articleposts });
    } else {
        res.render('articles/communication', { articleposts });
    }
}

const gestionEmotions_index = async (req, res) => {
    const articleposts = await ArticlePost.find().sort({ _id: -1 });
    if (req.session.user) {
        res.render('articles/gestionemotions', { user: req.session.user, articleposts });
    } else {
        res.render('articles/gestionemotions', { articleposts });
    }
}

const article_details = async (req, res) => {
    const articlepost = await ArticlePost.findById(req.params.id);
    if (req.session.user) {
        res.render('articles/post', { user: req.session.user, articlepost, comments: [] });
    } else {
        res.render('articles/post', { articlepost, comments: [] });
    }
}

const article_create_get = (req, res) => {
    if (req.session.user) {
        res.render('articles/create', { user: req.session.user });
    }
    else {
        res.redirect('articles/connexion')
    }
}

const article_create_post = async (req, res) => {
    ArticlePost.create({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        author: req.session.user
    }),
        res.redirect('/');
}

const article_delete = (req, res) => {

    if (req.session.user) {
        const id = req.params.id;
        ArticlePost.findByIdAndDelete(id)
            .then(result => {
                res.json({ redirect: '../articles' })
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        res.json({ redirect: '../connexion' })
    }
}

const comment_create_get = (req, res) => {
    const articleId = req.params.id;
    if (req.session.user) {
        res.render('articles/comment', { articleId, user: req.session.user });
    } else {
        res.render('articles/comment', { articleId });
    }
}

const comment_create_post = async (req, res) => {
    const articlepost = await ArticlePost.findById(req.params.id);
    const id = req.params.id;
    const getComment = {
        username: req.body.username,
        text: req.body.text
    };

    createComment(id, getComment);
    getArticlePostWithPopulate(id);
    const comments = await CommentModel.find().sort({ _id: -1 });
    if (req.session.user) {
        res.render('articles/post', { user: req.session.user, articlepost, comments, messageComment: "Commentaire bien enregistré!" });
    } else {
        res.render('articles/post', { articlepost, comments, messageComment: "Commentaire bien enregistré!" });
    }
}

module.exports = {
    article_index, 
    vieDeFamille_index, 
    communication_index, 
    gestionEmotions_index,
    article_details, 
    article_create_get,
    article_create_post,
    article_delete, 
    comment_create_get, 
    comment_create_post
}