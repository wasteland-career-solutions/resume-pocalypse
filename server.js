// Importing required packages
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');


// Import sequelize connection and the models
const sequelize = require('./config/connection');
const { Answer, Question, User, UserData } = require('./models');

// Setting up express app
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up express middleware that is for parsing request body and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sets up handlebars as the view engine 
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configures express-session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 7200000 }, // 15 min session 
    })
);

// Sets up and imports api and view routes
const apiRoutes = require('./routes/api');
const viewRoutes = require('./routes/views');
app.use('/api', apiRoutes);
app.use('/', viewRoutes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`)
    })
})