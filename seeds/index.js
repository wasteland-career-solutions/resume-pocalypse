const sequelize = require('../config/connection');
const { Question } = require('../models');
// const Question = require('../models/Question');

const questionSeedData = require('./questionSeedData.json');

const answerSeedData = require('./answerSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const questions = await Question.bulkCreate(questionSeedData);

    const answers = await Answer.bulkCreate(answerSeedData.json);

    // await Question.bulkCreate(questionSeedData, {
    //     individualHooks: true,
    //     returning: true,
    // });

    process.exit(0);
};




seedDatabase();
