const { Router } = require('express');
const { 
    getMyDiary,
    addNewDiary,
    getDiaryById,
    updateDiaryPage,
    updateDiary,
    deleteDiary,
    addCommentToDiary
} = require('../controllers/diary.controller');
const router = Router();

router.get('/my', getMyDiary);
router.post('/add', addNewDiary);
router.get('/update/:id', updateDiaryPage);
router.post('/update/:id', updateDiary);
router.post('/delete/:id', deleteDiary);
router.post('/comment/:id', addCommentToDiary);
router.get('/:id', getDiaryById);

module.exports = router;