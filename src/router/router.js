const index = require('../ctr/index'),
      login = require('../ctr/login'),
      validate = require('../ctr/validate');
      ie = require('../ctr/ie');

module.exports = function(router){
    router.get('/',index.getCtr);
    router.get('/login',login.getLogin);
    router.post('/validate',validate.getVali);
    router.get('/ie',ie.error);
}
