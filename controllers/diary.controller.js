const db = require('../models/index.model');
const Diary = db.diary;

//Desc      Get all my diaries page
//Route     GET /diary/my
//Acess     Private
const getMyDiary = async (req, res) => {
    try {
        const diaries = await Diary.findAll({
            raw: true
        });
        res.render('diary/my-diary', {
            title: 'My diary',
            diaries: diaries
        })
    } catch (error) {
        console.log(error);
    }
}

//Desc      create new diary page
//Route     POST /diary/my
//Acess     Private
const addNewDiary = async (req, res) => {
    try {
        const { imageUrl, text } = req.body
        await Diary.create({
            imageUrl: imageUrl,
            text: text
        })
        res.redirect('/diary/my')
    } catch (err) {
        console.log(err);
    }
}

//Desc      Get diary
//Route     GET /diary/my
//Acess     Private
const getDiaryById = async (req, res) => {
    try {
        const diary = await Diary.findByPk(req.params.id, {
            raw: true
        });
        res.render('diary/one-diary', {
            title: 'one diary',
            diary: diary
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMyDiary,
    addNewDiary,
    getDiaryById
}