const User = require('./User');
const UserData =  require('./UserData');
// const Question = require('./Question');
// const Answer = require('./Answer');

User.hasOne(UserData, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

UserData.belongsTo(User, {
    foreignKey: 'user_id',
});

// module.exports = { UserData, User, Question, Answer };
module.exports = { UserData, User };