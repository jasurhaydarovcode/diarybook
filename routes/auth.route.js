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
const { body, check } = require('express-validator');

router.get('/login', guest, getLoginPage);
router.post('/login',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email'),
        body('password', 'Password must be at least 7 characters')
            .isLength({ min: 7 })
    ],
    guest, loginUser
);
router.get('/logout', protected, logout);
router.get('/registration', guest, getRegisterPage);
router.post('/registration', [
    body('email', 'Please enter a valid email').isEmail(),
    body('name', 'Name can contain only alphabetical characters').isAlpha(),
    body('password', 'Please enter password with minumum 7 characters and with alphabetical and numeric values')
        .isLength({ min: 7 }).isAlphanumeric(),
], guest, registerUser);

module.exports = router;