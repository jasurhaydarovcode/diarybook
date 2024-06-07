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
db.comment = require('./comment.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);


db.user.hasMany(db.diary, {
    as: 'diaries',
    onDelete: 'CASCADE',
    constraints: true
});
db.user.hasMany(db.comment, { 
    as: 'comment',
    onDelete: 'CASCADE',
    constraints: true
});
db.diary.hasMany(db.comment, { 
    as: 'comment',
    onDelete: 'CASCADE',
    constraints: true
});
db.diary.belongsTo(db.user, {
    foreignKey : "userId",
    as: 'user'
});
db.comment.belongsTo(db.user, {
    foreignKey : "userId",
    as: 'user'
})
db.comment.belongsTo(db.diary, {
    foreignKey : "diaryId",
    as: 'diary'
})

module.exports = db; 