// IMPORT
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const ArticlePost = require("./models/ArticlePost");
const { log } = require('console');
const internal = require('stream');

const articlesRoutes = require('./routes/articlesRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// DECLARATION
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/parenthelpdb', { useNewUrlParser: true });

//  Moteur de template
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ******** GESTION DE L'USER *******
app.use(userRoutes);

// ****** Articles Routes ***********
app.use(articlesRoutes);

// ********* NAVIGATION DANS LES AUTRES MENUS DU SITE ***********
app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('index', { user: req.session.user });
    }
    else {
        res.render('index');
    }
})

app.get('/about', (req, res) => {
    if (req.session.user) {
        res.render('about', { user: req.session.user });
    }
    else {
        res.render('about');
    }
})

app.get('/contact', (req, res) => {
    if (req.session.user) {
        res.render('contact', { user: req.session.user });
    }
    else {
        res.render('contact');
    }
})

// ****** INITIALISATION DE LA BDD **************
async function initBDD() {
    const isData = await ArticlePost.find({}).exec();
    if (isData.length == 0) {
        console.log("initialisation de la BdD...");
        ArticlePost.create({
            title: "les règles d'or d'une famille",
            category: "Vie de famille",
            content: "lorem lorem",
            author: "initBDD"
        });
        ArticlePost.create({
            title: "la communication",
            category: "Communication",
            content: "Entendre et s'écouter",
            author: "initBDD"
        });
        ArticlePost.create({
            title: "Savoir gérer leur émotions",
            category: "Gestion émotionnelle",
            content: "Demande beaucoup de patiences",
            author: "initBDD"
        });

    } else {
        console.log(" la BdD est déja chargée...");
    }
} 
initBDD();

app.listen(port, () => {
    console.log(`Express app listening at htpp://localhost/${port}`);
})
