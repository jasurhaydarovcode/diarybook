const { Router } = require('express');
const { 
    getLoginPage,
    loginUser,
    logout,
    getRegisterPage,
    registerUser
} = require('../controllers/auth.controller');
const router = Router();
const { guest, protected } = require('../middlewares/auth.mid');
const { body, check }  = require('express-validator');

router.get('/login', guest, getLoginPage);
router.post('/login', 
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email'),  
    guest, loginUser
);
router.get('/logout', protected, logout);
router.get('/registration', guest, getRegisterPage);
router.post('/registration', guest, registerUser);

module.exports = router;