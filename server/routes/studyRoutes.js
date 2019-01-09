const express = require('express');
const json = require('body-parser').json();
const uuid = require("uuidv4");
const Study = require('./../models/Study');
const auth = require('./../util/authMiddleware');

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