const express = require('express');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const pgStore = require('connect-pg-simple')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const pool = require('./config/db');
const db = require('./models/index.model');

//Initial env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    store: new pgStore({
        pool: pool,
        tableName: 'user_session', 
    }),
    secret: 'my secret value',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

//Initialize template engine (handlebars)
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//Static File
app.use(express.static(path.join(__dirname, 'public')));

//Initialize routes
app.use('/diary', require('./routes/diary.route'));
app.use(csrf());
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use('/auth', require('./routes/auth.route'));
app.use('/user', require('./routes/user.route'));
app.use('/', async(req, res) => {
    try {
        if (req.session.isLogged) {
            return res.redirect('/diary/my');
        }
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
    }
})

const PORT = process.env.PORT || 10000

const start = async () => {
    try {
        const connect = await db.sequelize.sync();
        app.listen(PORT, () => {
            console.log(`\n🥳 🥳 🥳 🤭\nhttp://localhost:${PORT}/diary/my\nServer is running on port ${PORT}`)
        });
    } catch (error) {
        console.log(error);
    }
}

start();
