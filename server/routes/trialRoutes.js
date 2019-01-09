const express = require('express');
const json = require('body-parser').json();
const uuid = require("uuidv4");
const Study = require('./../models/Study');
const Trial = require('./../models/Trial');
const auth = require('./../util/authMiddleware');

const trialRoutes = module.exports = exports = express.Router();

const handleError = (res, e) => {
  return res.status(500).json(e.toString());
}


trialRoutes.post('/start', json, async (req, res) => {
  const {
    participantId,
    studyId,
  } = req.body;


  let trial = new Trial();
  trial.participantId = participantId;
  trial.studyId = studyId;
  trial.started = Date.now();

  let saved;
  try {
    saved = await trial.save();
  } catch (e) {
    return handleError(res, e);
  }

  res.status(200).json({ trial: saved });
});

trialRoutes.post('/update', json, async (req, res) => {
  const {
    participantId,
    studyId,
    response
  } = req.body;

  let trial;
  try {
    trial = await Trial.findOneAndUpdate( {participantId, studyId }, { $push: { responses: response }}, { new: true });
  } catch (e) {
    return handleError(res, e);
  }

  console.log(trial);
  res.status(200).json({ success: true })
});