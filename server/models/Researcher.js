/**
 * Author: Sam Heutmaker [samheutmaker@gmail.com]
 */

const { Schema, model } = require("mongoose");

const researcherSchema = new Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  passwordHash: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    required: true
  }
});

const Researcher = model('Researcher', researcherSchema);

module.exports = Researcher;
