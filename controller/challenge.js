const ChallengeModel = require('../model/challengeModel');
const createGame = require('./game.js');

exports.challenge = (req, res) => {
  const newChallenge = new ChallengeModel.Challenge({
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
  ).catch(
    (error) => {
      console.error(error);
      res.status(500).json({
        error,
      });
    },
  );
};

exports.getChallenges = (req, res) => {
  ChallengeModel.Challenge.find({ challengee: req.body.userId }).then(
    (challenges) => {
      res.status(200).json({ challenges });
    },
  );
};

exports.acceptChallenge = (req, res) => {
  const game = {
    running: true,
    rated: req.body.rated,
    state: '',
    moves: '',
    events: [],
  };

  if (req.body.challengerColor === 'RANDOM') {
    const players = [req.body.challenger, req.body.challengee];
    const white = Math.floor(Math.random() * players.lenght);
    game.white = players[white];
    game.black = players[white + 1];
  } else if (req.body.color === 'BLACK') {
    game.white = req.body.challengee;
    game.black = req.body.challenger;
  } else if (req.body.color === 'WHITE') {
    game.white = req.body.challenger;
    game.black = req.body.challengee;
  } else {
    res.status(401).json({
      message: 'Invalid Player Color',
    });
  }

  createGame(game);
};
