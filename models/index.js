const User = require('./User');
const UserData =  require('./UserData');
const Question = require('./Question');
const Answer = require('./Answer');

User.hasOne(UserData, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

UserData.belongsTo(User, {
    foreignKey: 'user_id'
});

Question.hasOne(Answer, {
  foreignKey: 'question_id',
  onDelete: 'CASCADE'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id'
})

// module.exports = { UserData, User, Question, Answer };
module.exports = { UserData, User, Question, Answer };
