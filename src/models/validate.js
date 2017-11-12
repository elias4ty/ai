const mongoose = require('mongoose'),
      validateSchema = require('../schemas/validate'),
      validateModel = mongoose.model('elias_session',validateSchema);

module.exports = validateModel;
