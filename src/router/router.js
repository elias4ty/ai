const index = require('../ctr/index'),
      login = require('../ctr/login');

module.exports = function(router){
    router.get('/',index.getCtr);
    router.get('/login',login.getLogin);
}
