const Sequelize = require('sequelize');

const sequelize = new Sequelize('diarybook', 'postgres', '12122006', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize; 