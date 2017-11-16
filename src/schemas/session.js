const mongoose = require('mongoose'),
      sessionSchema = mongoose.Schema({
        user : String,
        password : String,
        sid : String,
        ttl : Date
      },{collection : 'elias_session'});

sessionSchema.statics = {
   findSession(ss){
     var that = this;

     return new Promise((rv,rj) => {
        that.find({'sid':ss},(err,data) =>{
            if(err) rj(err)
            rv(data)
        })
     })
   }
}

module.exports = sessionSchema;
