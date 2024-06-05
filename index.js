const express = require('express');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');

//Initial env variables
dotenv.config();

const app = express();

//Initialize template engine (handlebars)
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

//Initialize routes
app.use('/diary', require('./routes/diary.route'));

const PORT = process.env.PORT || 10000

app.listen(PORT, () => {
    console.log(`\n🥳 🥳 🥳 🤭\nhttp://localhost:10000/diary/my\nServer is running on port ${PORT}`)
});