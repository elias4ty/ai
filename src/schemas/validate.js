const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      validateSchema = new schema({
        user : String,
        password : String,
        sid : String,
        ttl : Date
      },{collection:'elias_session'});

validateSchema.statics = {
    findSession(ss) {
        var validateModel = this;
        validateModel.find({'sid':ss},(err,data) => {
            if(!data.length){
                return 'OK';
            }else{
                return 'None';
            }
        })
    },
    identify(user,password){
        var that = this;
        return new Promise((rv,rj) =>{
            that.find({user,password},(err,data) => {
                if(err) throw('db occurs error!')

                    rv(data)

            })
        })

    }
}

module.exports = validateSchema;