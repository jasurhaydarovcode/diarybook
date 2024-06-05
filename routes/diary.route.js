const { Router } = require('express');
const { getMyDiary } = require('../controllers/diary.controller');
const router = Router();

router.get('/my', getMyDiary)

module.exports = router;