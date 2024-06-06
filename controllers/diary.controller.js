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
            title: 'Diary',
            diary: diary
        })
    } catch (error) {
        console.log(error);
    }
}

//Desc      Update diary
//Route     GET /diary/update/:id
//Acess     Private
const updateDiaryPage = async (req, res) => {
    try {
        const diary = await Diary.findByPk(req.params.id, {
            raw: true
        });
        res.render('diary/update-diary', {
            title: 'Edit diary',
            diary: diary
        })
    } catch (error) {
        console.log(error);
    }
}

//Desc      Update diary
//Route     POST /diary/update/:id
//Acess     Private
const updateDiary = async (req, res) => {
    try {
        await Diary.update({ text: req.body.text }, {
            where: { id: req.params.id }
        })
        res.redirect('/diary/my')
    } catch (error) {
        console.log(error);
    }
}

//Desc      Delete diary
//Route     POST /diary/delete/:id
//Acess     Private
const deleteDiary = async (req, res) => {
    try {
        await Diary.destroy({
            where: { id: req.params.id }
        })
        res.redirect('/diary/my')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMyDiary,
    addNewDiary,
    getDiaryById,
    updateDiaryPage,
    updateDiary,
    deleteDiary
}