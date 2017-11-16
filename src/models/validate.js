const mongoose = require('mongoose'),
      validateSchema = require('../schemas/validate'),
      validateModel = mongoose.model('customer',validateSchema);

module.exports = validateModel;
