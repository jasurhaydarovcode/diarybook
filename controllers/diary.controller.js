const { Op } = require('sequelize');
const db = require('../models/index.model');
const Diary = db.diary;
const Comment = db.comment;
const User = db.user;
const { validationResult } = require('express-validator');

//Desc      Get all my diaries page
//Route     GET /diary/my
//Acess     Private
const getMyDiary = async (req, res) => {
    try {
        const diaries = await Diary.findAll({
            where: { userId: req.session.user.id },
            raw: true,
            plain: false,
            include: ['user'],
            nest: true
        })
        res.render('diary/my-diary', {
            title: 'My diary',
            diaries: diaries.reverse(),
            isAuthenticated: req.session.isLogged,
            errorMessage: req.flash('error')
        })
    } catch (error) {
        console.log(error);
    }
}

//Desc      Get all diaries
//Route     GET /diary/all
//Acess     Private
const getAllDiary = async (req, res) => {
    try {
        const diaries = await Diary.findAll({
            where: { userId: { [Op.ne]: req.session.user.id } },
            raw: true,
            plain: false,
            include: ['user'],
            nest: true
        })
        res.render('diary/all-diary', {
            title: 'All diary',
            diaries: diaries.reverse(),
            isAuthenticated: req.session.isLogged
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('diary/my-diary', {
                title: 'My Diaries',
                isAuthenticated: req.session.isLogged,
                errorMessage: errors.array()[0].msg
            })
        }
        await Diary.create({
            imageUrl: imageUrl,
            text: text,
            userId: req.session.user.id
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
        const data = await Diary.findByPk(req.params.id, {
            raw: false,
            plain: true,
            include: ['comment', 'user'],
            nest: true
        })
        const diary = await data.toJSON();
        res.render('diary/one-diary', {
            title: 'Diary',
            diary: diary,
            comments: diary.comment.reverse(),
            isAuthenticated: req.session.isLogged,
            errorMessage: req.flash('error')
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

//Desc      Add comment
//Route     POST /diary/comment/:id
//Acess     Private
const addCommentToDiary = async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user.id);
        if (req.body.comment === '') {
            req.flash('error', 'Please enter a comment');
            return res.redirect('/diary/' + req.params.id);
        }
        await Comment.create({
            name: user.name,
            comment: req.body.comment,
            diaryId: req.params.id,
            userId: user.id
        })
        res.redirect('/diary/' + req.params.id)
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
    deleteDiary,
    addCommentToDiary,
    getAllDiary
}