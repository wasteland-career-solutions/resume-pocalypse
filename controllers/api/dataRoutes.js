const router = require('express').Router();
const { json } = require('sequelize');
const { User, UserData, Question, Answer } = require('../../models');
const { generateResume } = require('../../utils/reidGenerateResume');
const PDFDocument = require('pdfkit');
const { Base64Encode } = require('base64-stream');

router.get('/test', (req, res) => {
    var doc = new PDFDocument();

    doc.fontSize(12);
    doc.font('Helvetica');
      
    doc.text(`This is a test`);
    // write to PDF

    var finalString = ''; // contains the base64 string
    var stream = doc.pipe(new Base64Encode());

    doc.end(); // will trigger the stream to end

    stream.on('data', function(chunk) {
        finalString += chunk;
    });

    stream.on('end', function() {
        // the stream is at its end, so push the resulting base64 string to the response
        res.json(finalString);
    });
})

router.get('/pdf', async (req, res) => {
    let userInfo;
    let answerData;
    // Step 1
    try {
        if(!req.session.logged_in) {
            res.status(401).json({message: 'You must be logged in to call this function.'});
            return;    
        }

        const data = await UserData.findAll({
            raw: true, 
            where: {user_id: req.session.user.id },
            include: [
                { 
                    model: User,
                    attributes: ['email', 'first_name', 'last_name']
                }
            ]
        });

        if (!data) {
            res.status(401).json({message: 'Sorry! No data was found associated with your session.'});
            res.redirect('/data'); // Redirect user to additional data page.
            return;
        }

        userInfo = data;
    } catch (err) {
        res.status(500).json(err)
    }
    // Step 2
    try {
        const dbAnswerData = await Answer.findAll({
            raw: true,
            where: {user_id: req.session.user.id },
            include: [
                { 
                    model: Question,
                    attributes: ['name', 'question_type']
                }
            ]
        });
        answerData = dbAnswerData;
    } catch (err) {
        res.status(500).json(err);
        console.error(err);
    }

    console.log("Sending data through route:")

    // const result = generateResume(userInfo, answerData);
    // console.log('In api:', result);

    res.json({userInfo, ...answerData});

    // if(result){
    //     res.status(200).json(userInfo, answerData);
    // } else {
    //     res.status(500).json(result);
    // }
});

module.exports = router;