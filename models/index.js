const User = require('./User');
const UserData =  require('./UserData');
const Question = require('./Question');
const Answer = require('./Answer');

UserData.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { UserData, User, Question, Answer };