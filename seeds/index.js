const sequelize = require('../config/connection');
const { Question, Answer, User, UserData } = require('../models');
// const Question = require('../models/Question');

const questionSeedData = require('./questionSeedData.json');

const answerSeedData = require('./answerSeedData.json');

const userSeedData = require("./userSeedData.json");

const userDataSeedData = require("./userDataSeedData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const questions = await Question.bulkCreate(questionSeedData);

    const answers = await Answer.bulkCreate(answerSeedData);

    const user = await User.bulkCreate(userSeedData);

    const userData = await UserData.bulkCreate(userDataSeedData);

    // await Question.bulkCreate(questionSeedData, {
    //     individualHooks: true,
    //     returning: true,
    // });

    process.exit(0);
};




seedDatabase();
