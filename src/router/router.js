const index = require('../ctr/index');

module.exports = function(router){
    router.get('/',index.getCtr);
}
