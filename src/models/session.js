const mongoose = require('mongoose'),
      sessionSchema = require('../schema/session'),
      sessionModel = mongoose.model('elias_session',sessionSchema);

module.exports = sessionModel;
