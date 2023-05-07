// Importing required packages
require('dotenv').config();
const express = require('express');
const session = require('express-session');
// const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import sequelize connection and the models
const sequelize = require('./config/connection');
const { Answer, Question, User, UserData } = require('./models');

// Setting up express app
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 7200000 }, // 15 min session 
        store: new SequelizeStore({
            db: sequelize,
          }),
    })
);

app.engine('handlebars', hbs.engine);
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');

// Sets up express middleware that is for parsing request body and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Sets up handlebars as the view engine 

// Configures express-session middleware
app.use(routes);

// Sets up and imports api and view routes
// const apiRoutes = require('./controllers/api');
// const homeRoutes = require('./controllers');
// app.use('/api', apiRoutes);
// app.use('/', homeRoutes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`)
    })
})