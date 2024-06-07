const { Router } = require('express');
const { 
    getLoginPage,
    loginUser
} = require('../controllers/auth.controller');
const router = Router();

router.get('/login', getLoginPage);
router.post('/login', loginUser);

module.exports = router;