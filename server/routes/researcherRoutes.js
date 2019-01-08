const express = require('express');
const json = require('body-parser').json();
const Researcher = require('./../models/Researcher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET
} = require('./../env');

const researcherRoutes = module.exports = exports = express.Router();

const handleError = (res, e) => {
  return res.status(500).json(e.toString());
}

const clean = researcher => {
  delete researcher.passwordHash;
  return researcher;
}

const getJwt = _id => {
  return jwt.sign({ _id }, JWT_SECRET);
}

researcherRoutes.post('/register', json, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;


  try {
    let existing = await Researcher.findOne({ email });
    if(existing) {
      throw new Error('This email is already registered. Please try again or contact support.');
    }
  } catch(e) {
    return handleError(res, e);
  }

  let passwordHash;

  try {
    passwordHash = await bcrypt.hash(password, 10);
  } catch(e) {
    return handleError(res, e);
  }

  let researcher = new Researcher();
  researcher.firstName = firstName;
  researcher.lastName = lastName;
  researcher.email = email;
  researcher.passwordHash = passwordHash;
  researcher.created = Date.now();

  let saved;
  try {
    saved = await researcher.save();
  } catch(e) {
    return handleError(res, e);
  }
  
  let token = getJwt(researcher._id);

  res.status(200).json({ researcher: clean(saved), token });
});


researcherRoutes.post('/login', json, async (req, res) => {
  const {
    email,
    password
  } = req.body;

  let researcher;

  try {
    researcher = await Researcher.findOne({ email });
    if (!researcher) {
      throw new Error('An account with this email does not exist.');
    }
  } catch (e) {
    return handleError(res, e);
  }

  let isValid;

  try {
    isValid = await bcrypt.compare(password, researcher.passwordHash);
    if(!isValid) {
      throw new Error('Invalid password.');
    }
  } catch (e) {
    return handleError(res, e);
  }

  let token = getJwt(researcher._id);


  res.status(200).json({ researcher: clean(researcher), token });
});

