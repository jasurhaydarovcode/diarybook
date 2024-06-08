const db = require('../models/index.model');
const User = db.user;
const Diary = db.diary;

//Desc      Get user profile
//Route     GET /user/profile/:id
//Acess     Private
const getUserProfile = async (req, res) => {
    const user = await User.findOne({ 
        where: { id: req.params.id },
        raw: true
    })
    const diaries = await Diary.findAll({ where: { userId: user.id }, raw: true });
    try {
        res.render('user/profile', {
            title: user.name,
            user: user,
            diariesLength: diaries.length,
            isAuthenticated: req.session.isLogged
        })
    } catch (error) {
        console.log(error);
    }
}

//Desc      Get my profile
//Route     GET /user/profile/my
//Acess     Private
const getMyProfile = async (req, res) => {
    const user = req.session.user;
    const diaries = await Diary.findAll({ where: { userId: user.id }, raw: true });
    try {
        res.render('user/myprofile', {
            title: user.name,
            user: user,
            diariesLength: diaries.length,
            isAuthenticated: req.session.isLogged
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUserProfile,
    getMyProfile
}