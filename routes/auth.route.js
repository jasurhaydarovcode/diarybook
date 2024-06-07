const { Router } = require('express');
const { 
    getLoginPage,
    loginUser,
    logout,
    getRegisterPage,
    registerUser
} = require('../controllers/auth.controller');
const router = Router();

router.get('/login', getLoginPage);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/registration', getRegisterPage);
router.post('/registration', registerUser);

module.exports = router;