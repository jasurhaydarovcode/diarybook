const db = require('../models/index.model');
const bcrypt = require('bcryptjs');
const User = db.user;

//Desc      Get login page
//Route     GET /auth/login
//Acess     Public
const getLoginPage = async (req, res) => {
    try {
        const isAuthenticated = req.session.isLogged;
        res.render('auth/login', {
            title: 'Login',
            isAuthenticated
        })
    } catch (error) {
        console.log(error);
    }
}

//Desc      Login user
//Route     POST /auth/login
//Acess     Public
const loginUser = async (req, res) => {
    try {
        req.session.isLogged = true;
        req.session.user = {
            id: 1,
            email: 'user@example.com',
            name: 'user',
            password: 'Alan12122006#'
        }
        req.session.save(err => {
            if (err) throw err;
            res.redirect('/diary/my')
        });
    } catch (error) {
        console.log(error);
    }
}

//Desc      Get registration page
//Route     GET /auth/registration
//Acess     Public
const getRegisterPage = async (req, res) => {
    try {
        res.render('auth/registration', {
            title: 'Registration',
        })
    } catch (error) {
        console.log(error);
    }
}

//Desc      register new user
//Route     POST /auth/registration
//Acess     Public
const registerUser = async (req, res) => {
    try {
        const { email, name, password, password2 } = req.body;
        if(password !== password2){
            return res.redirect('/auth/registration')
        }
        const userExist = await User.findOne({ where: { email } })
        if(userExist){
            return res.redirect('/auth/registration')
        }
        const salt = await bcrypt.genSalt(11)
        const hashedPassword = await bcrypt.hash(password, salt)
        await User.create({
            email,
            name,
            password: hashedPassword
        })
        return res.redirect('/auth/login')
    } catch (error) {
        console.log(error);
    }
}

//Desc      Logout user
//Route     POST /auth/logout
//Acess     Private
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    })
}

module.exports = {
    getLoginPage,
    loginUser,
    logout,
    getRegisterPage,
    registerUser
}