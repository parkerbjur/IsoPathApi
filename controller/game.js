const ChallengeModel = require('../model/challengeModel');

exports.challenge = (req, res, next) => {
  const newChallenge = new ChallengeModel({
    challenger: req.body.challenger,
    challengee: req.body.challengee,
    rated: req.body.rated,
    clockTime: req.body.clockTime,
    clockIncrement: req.body.clockIncrement,
    color: req.body.color,
  });
  newChallenge.save().then(
    () => {
      res.status(201).json({
        message: 'Challenge Created',
      });
    },
  );
};
