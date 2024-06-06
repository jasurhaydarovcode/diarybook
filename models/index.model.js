const Sequelize = require('sequelize');

const sequelize = new Sequelize('diarybook', 'postgres', '12122006', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.diary = require('./diary.model')(sequelize, Sequelize);

module.exports = db; 