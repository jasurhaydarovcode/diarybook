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
const { protected } = require('../middlewares/auth.mid');

router.get('/my', protected, getMyDiary);
router.post('/add', protected, addNewDiary);
router.get('/update/:id', protected, updateDiaryPage);
router.post('/update/:id', protected, updateDiary);
router.post('/delete/:id', protected, deleteDiary);
router.post('/comment/:id', protected, addCommentToDiary);
router.get('/:id', protected, getDiaryById);

module.exports = router;