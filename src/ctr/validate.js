const validateModel = require('../models/validate');

exports.getVali = function* (next){
   let data = this.request.body,
       isCustomer = validateModel.identify(data.user,data.password);

   if(isCustomer){
      this.ctx.redirect(data.referrer);
   }
}
