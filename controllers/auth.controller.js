const db = require('../models/index.model');
const User = db.user;

//Desc      Get login page
//Route     GET /auth/login
//Acess     Public
const getLoginPage = async (req, res) => {
    try {
        res.render('auth/login', {
            title: 'Login',
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getLoginPage
}