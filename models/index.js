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

// Question.hasOne(Answer, {
//   foreignKey: 'question_id',
//   onDelete: 'CASCADE'
// });

// Answer.belongsTo(Question, {
//     foreignKey: 'question_id'
// })

// Answer.hasOne(User, {
//     foreignKey: 'user_id',
// })

// Answer.hasOne(Question, {
//     foreignKey: 'question_id',
// })

// User.belongsToMany(Answer, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
// })

// module.exports = { UserData, User, Question, Answer };
module.exports = { UserData, User, Question, Answer };
