const { Router } = require('express');
const { 
    getLoginPage
} = require('../controllers/auth.controller');
const router = Router();

router.get('/login', getLoginPage);

module.exports = router;