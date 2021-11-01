const express = require('express');

const Comment = require("../models/CommentModel");
const CommentModel = require('../models/CommentModel');
// const ArticlePost = require("../models/ArticlePost");
// Mise en place des controllers
const articlesController = require('../controllers/articlesController');



// const userRoutes = require('./userRoutes.js');

const router = express.Router();

// *********** GESTION DE LA VISUALISATION DES ARTICLES ************

// Visualisation de tous les articles
router.get('/articles', articlesController.article_index);

// Visualisation des articles de la catégorie vie de famille
router.get('/viefamille',articlesController.vieDeFamille_index);

// Visualisation des articles de la catégorie communication
router.get('/communication', articlesController.communication_index);

// Visualisation des articles de la catégorie gestion émotionnelle
router.get('/gestionemotions', articlesController.gestionEmotions_index);

// ******** GESTION DES ACTIONS SUR LES ARTICLES *******

// Création d'un nouvel article conditionnée par la connexion de l'utilisateur
router.get('/articles/new', articlesController.article_create_get);

// Envoi de l'article créé en BdD et redirection sur la page de tous les articles
router.post('/articles/store', articlesController.article_create_post);


// Création d'un commentaire pour un article 
// fontions de création 
const createComment = function (articleId, comment) {
    return Comment.create(comment).then(docComment => {

        return ArticlePost.findByIdAndUpdate(
            articleId,
            { $push: { comments: docComment._id } },
            { new: true, useFindAndModify: false }
        );
    });
};

// fonction qui doit afficher le détail des commentaires dans l'article
const getArticlePostWithPopulate = function (id) {
    return ArticlePost.findById(id).populate("comments");
};

// Route d'accès au formulaire pour rédiger le commentaire
router.get('/comment/:id', articlesController.comment_create_get)

router.post('/comment/add/:id', articlesController.comment_create_post)

// Accès à l'article correspondant à l'id
router.get('/post/:id', articlesController.article_details);

// Suppression en BdD de l'article correspondant à l'id
router.delete('/post/:id', articlesController.article_delete);

module.exports = router;
