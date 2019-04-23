/**
 * Author: Sam Heutmaker [samheutmaker@gmail.com]
 */

const express = require('express');
const json = require('body-parser').json();
const uuid = require("uuidv4");
const Study = require('./../models/Study');
const auth = require('./../util/authMiddleware');
const Trial = require('./../models/Trial');
const { Readable } = require("stream");

const studyRoutes = module.exports = exports = express.Router();

const handleError = (res, e) => {
  return res.status(500).json(e.toString());
}


studyRoutes.post('/create', auth, json, async (req, res) => {
  const {
    name,
  } = req.body;

  let study = new Study();
  study.studyId = uuid();
  study.researcherId = req.researcher._id;
  study.name = name;
  study.created = Date.now();

  let saved;
  try {
    saved = await study.save();
  } catch (e) {
    return handleError(res, e);
  }

  res.status(200).json({ study: saved });
});


studyRoutes.get('/list', auth, async(req, res) => {
  let researcherId = req.researcher._id;

  let studies;
  try {
    studies = await Study.find({ researcherId });
  } catch (e) {
    return handleError(res, e);
  }

  res.status(200).json({ studies });
});


function getTrialResponseData(trial) {
  return trial.responses.reduce((cur, next) => {
    return cur + `${trial.participantId} ${next.date} ${next.time} ${next.condition} ${next.block} ${next.currentTrial} ${next.response} ${next.responseTime} ${next.bean} ${next.currentBeanValue} \n`;
  }, '');
}

studyRoutes.get('/results/:studyId', async(req, res) => {
  let studyId = req.params.studyId;

  let trials;
  try {
    trials = await Trial.find({
      studyId,
    });
  } catch(e) {
    return handleError(res, e); 
  }
  
  let lines = trials.reduce((cur, next) => {
    return cur + getTrialResponseData(next) + '\n\n\n\n\n';
  }, '');

  const s = new Readable();
  s.push(lines);
  s.push(null);

  s.pipe(res);
});
