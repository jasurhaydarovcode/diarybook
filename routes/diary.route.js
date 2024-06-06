const { Router } = require('express');
const { 
    getMyDiary,
    addNewDiary
} = require('../controllers/diary.controller');
const router = Router();

router.get('/my', getMyDiary);
router.post('/add', addNewDiary);

module.exports = router;