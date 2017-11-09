const index = require('../ctr/index'),
      login = require('../ctr/login'),
      validate = require('../ctr/validate');

module.exports = function(router){
    router.get('/',index.getCtr);
    router.get('/login',login.getLogin);
    router.post('/validate',validate.getVali);
}
