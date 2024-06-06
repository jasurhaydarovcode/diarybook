const { Router } = require('express');
const { 
    getMyDiary,
    addNewDiary,
    getDiaryById
} = require('../controllers/diary.controller');
const router = Router();

router.get('/my', getMyDiary);
router.post('/add', addNewDiary);
router.get('/:id', getDiaryById);

module.exports = router;