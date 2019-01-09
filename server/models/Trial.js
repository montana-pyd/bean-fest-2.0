const { Schema, model } = require('mongoose');

const trialSchema = new Schema({
  studyId: {
    type: String,
    required: true
  },
  participantId: {
    type: String,
    required: true
  },
  started: {
    type: Date,
    required: true
  },
  ended: {
    type: Date,
    required: false,
  },
  responses: [{
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    participantId: {
      type: String,
      required: true,
    },
    condition: {
      type: Number,
      required: true,
    },
    block: {
      type: Number,
      required: true,
    },
    currentTrial: {
      type: Number,
      required: true, 
    },
    response: {
      type: String,
      required: true,
    },
    responseTime: {
      type: Number,
      required: true,
    },
    bean: {
      type: String,
      required: true,
    },
    currentBeanValue: {
      type: String,
      required: true,
    },
  }],
});

const Trial = model('Trial', trialSchema);

module.exports = Trial;
