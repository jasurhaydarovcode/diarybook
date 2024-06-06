const express = require('express');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const db = require('./models/index.model');

//Initial env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Initialize template engine (handlebars)
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//Initialize routes
app.use('/diary', require('./routes/diary.route'));

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
