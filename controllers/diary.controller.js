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

//Desc      Get all my diaries page
//Route     POST /diary/my
//Acess     Private
const addNewDiary = async (req, res) => {
    try {
        const { imageUrl, text } = req.body
        console.log(req.body.text);
        await Diary.create({
            imageUrl: imageUrl,
            text: text
        })
        res.redirect('/diary/my')
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getMyDiary,
    addNewDiary
}