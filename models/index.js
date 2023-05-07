const User = require('./User');
const UserData =  require('./UserData');

User.hasOne(UserData, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

UserData.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { UserData, User };