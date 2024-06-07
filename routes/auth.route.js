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

router.get('/login', guest, getLoginPage);
router.post('/login',  guest, loginUser);
router.get('/logout', protected, logout);
router.get('/registration', guest, getRegisterPage);
router.post('/registration', guest, registerUser);

module.exports = router;