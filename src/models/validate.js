const validateSchema = require('../schemas/validate'),
      validateModel = this.mongo.model('session',validateSchema);

module.exports = validateModel;
