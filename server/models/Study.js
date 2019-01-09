const { Schema, model } = require('mongoose');

const studySchema = new Schema({
  studyId: {
    type: String,
    required: true
  },
  researcherId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  } 
});

const Study = model('Study', studySchema);

module.exports = Study;
