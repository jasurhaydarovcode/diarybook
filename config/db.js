const Sequelize = require('sequelize');

const sequelize = new Sequelize('diarybook', 'postgres', '12122006', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

module.exports = sequelize; 