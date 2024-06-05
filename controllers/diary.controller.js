
//Desc      Get all my diaries page
//Route     /diary/my
//Acess     Private
const getMyDiary = (req, res) => {
    res.render('diary/my-diary')
}

module.exports = {
    getMyDiary
}