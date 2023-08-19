const router = require("express").Router();
const { User, UserData, Question, Answer } = require("../../models");

// User Route
router.get("/user", async (req, res) => {
  console.log(req.session.user);
  try {
    if (!req.session.logged_in) {
      res
        .status(401)
        .json({ message: "You must be logged in to call this function." });
      return;
    }
    // maybe just send back req.session.user
    const data = await User.findByPk(req.session.user.id); //unfortunately this also sends back password

    if (!data) {
      res
        .status(401)
        .json({
          message: "Sorry! No data was found associated with your session.",
        });
      return;
    }

    res.status(200).json(data); // Send back all known data associated with the current logged in User
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Information Route
router.get("/queryuser", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res
        .status(401)
        .json({ message: "You must be logged in to call this function." });
      return;
    }

    const data = await UserData.findAll({
      where: { user_id: req.session.user.id },
      include: [
        {
          model: User,
          attributes: ["email", "first_name", "last_name"],
        },
      ],
    });

    if (!data) {
      res
        .status(401)
        .json({
          message: "Sorry! No data was found associated with your session.",
        });
      res.redirect("/data"); // Redirect user to additional data page.
      return;
    }

    res.status(200).json(data); // Send back all known data associated with the current logged in User
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Additional Information Route
router.get("/userinfo", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res
        .status(401)
        .json({ message: "You must be logged in to call this function." });
      return;
    }

    const data = await UserData.findAll({
      where: { user_id: req.session.user.id },
    });

    if (!data) {
      res
        .status(401)
        .json({
          message: "Sorry! No data was found associated with your session.",
        });
      res.redirect("/data"); // Redirect user to additional data page.
      return;
    }

    res.status(200).json(data); // Send back all known data associated with the current logged in User
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Answers Route
router.get("/useranswers", async (req, res) => {
  console.log("Do I even exist?");
  try {
    const dbAnswerData = await Answer.findAll({
      where: { user_id: req.session.user.id },
      include: [
        {
          model: Question,
          attributes: ["name", "question_type"],
        },
      ],
    });
    const answers = dbAnswerData.map((answer) => answer.get({ plain: true }));
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

// Questions Route
router.get("/play", async (req, res) => {
  try {
    const dbQuestionData = await Question.findAll();

    const questions = dbQuestionData.map((question) =>
      question.get({ plain: true })
    );
    res.json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Specific Question Route
router.get("/play/:id", async (req, res) => {
  try {
    const dbQuestionData = await Question.findByPk(req.params.id);

    const questions = dbQuestionData.map((question) =>
      question.get({ plain: true })
    );
    res.json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Submit Answer Route
router.post("/submitanswer", async (req, res) => {
  try {
    const dbUserAnswers = await Answer.create({
      user_id: req.session.user.id,
      question_id: req.body.questionId,
      user_answer: req.body.userAnswer,
    });

    res.status(200).json(dbUserAnswers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Submit All Answers Route
router.post("/submitallanswers", async (req, res) => {
  console.log(req.body);
  const formatted = req.body.map((answer) => ({
    user_id: req.session.user.id,
    ...answer,
  }));
  console.log(formatted);
  try {
    const dbUserAnswers = await Answer.bulkCreate(formatted);

    res.status(200).json(dbUserAnswers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Submit User Info Route
router.post("/info", async (req, res) => {
  console.log("Arrived in the backend");
  console.log(req.body);
  try {
    const dbUserData = await UserData.create({
      user_id: req.session.user.id,
      address_line_1: req.body.addrLine1,
      address_line_2: req.body.addrLine2,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zipCode,
      phone_number: req.body.phoneNum,
      github_url: req.body.githubUrl,
      linkedin_url: req.body.linkedInUrl,
    });

    // Create a "data_stored" session variable on user creation, sets it to true. (required for logout function)
    req.session.save(() => {
      req.session.data_stored = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Submit User Signup Route
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
    });

    req.session.user = {
      id: dbUserData.id,
      email: dbUserData.email,
      firstName: dbUserData.first_name,
    };

    // Create a "logged_in" session variable on user creation, sets it to true. (required for logout function)
    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Submit User Login Route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      res
        .status(401)
        .json({ message: "No user found with this email address." });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
      return;
    }

    // If email and password are correct, sets up user data in the session
    req.session.user = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
    };

    // Create a "logged_in" session variable, sets it to true. (required for logout function)
    req.session.save(() => {
      req.session.logged_in = true;
      // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      res.json({ user: user.first_name, message: "Succesful login!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Submit User Logout Route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
