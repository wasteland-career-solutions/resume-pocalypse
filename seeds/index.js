const sequelize = require('../config/connection');
const { Question, Answer, User, UserData } = require('../models');
// const Question = require('../models/Question');

const questionSeedData = require('./questionSeedData.json');

const answerSeedData = require('./answerSeedData.json');

const userSeedData = require("./userSeedData.json");

const userDataSeedData = require("./userDataSeedData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    const questions = await Question.bulkCreate(questionSeedData);
    console.log('\n----- QUESTIONS SEEDED -----\n');

    const answers = await Answer.bulkCreate(answerSeedData);
    console.log('\n----- ANSWERS SEEDED -----\n');

    const user = await User.bulkCreate(userSeedData);
    console.log('\n----- USERS SEEDED -----\n');

    const userData = await UserData.bulkCreate(userDataSeedData);
    console.log('\n----- USER DATA SEEDED -----\n');
    // await Question.bulkCreate(questionSeedData, {
    //     individualHooks: true,
    //     returning: true,
    // });

    process.exit(0);
};




seedDatabase();
