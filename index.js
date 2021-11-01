// INITIALISATION DES REQUIRE
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path:'./config/.env'});
require('./config/db');


// Constantes
const app = express();

// MIDDLEWARE
// permet de traiter la data du post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/user', userRoutes);
// SERVER
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
