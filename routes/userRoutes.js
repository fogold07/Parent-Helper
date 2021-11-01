const express = require('express');
const session = require('express-session');

const UserModel = require("../models/UserModel");
const crypto = require('crypto');

const router = express.Router();

const secret = 'jesuisladmin';

router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


router.get('/connexion', (req, res) => {
    res.render('user/connexion');
})

// Login du User - traite le cas d'un user inconnu et le redirige vers la page d'enregistement
router.post('/login', async (req, res) => {
    const userCheck = await UserModel.findOne({ username: req.body.username }).exec();
    const hash = await crypto.createHmac('sha256', secret).update(req.body.password).digest('base64');

    if (userCheck === null || !(req.body.username == userCheck.username && userCheck.password == hash)) {
        res.render('user/signin', { loginError: "Pseudo non reconnu, veuillez vous enregistrer" });
    }
    else {
        req.session.user = req.body.username;
        res.render('index', { user: req.session.user });
    }
})


// Route vers la page d'enregistrement d'un nouvel user
router.get('/signin', (req, res) => {
    res.render('user/signin');
})

// Enregistrement d'un nouvel user
router.post('/signin/new', (req, res) => {
    const hash = crypto.createHmac('sha256', secret).update(req.body.password).digest('base64');
    UserModel.create({
        email: req.body.email,
        username: req.body.username,
        password: hash
    });
    res.render('user/connexion', { loginMessage: "Enregistrement réussi, vous pouvez maintenant vous connecter !" });
})

// Deconnexion du user
router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => { if (err) { console.log(err); } });
        res.render('user/connexion', { logout: "Vous avez été déconnectés avec succès" });
    }
    else {
        res.redirect('/');
    }
})

module.exports = router;
