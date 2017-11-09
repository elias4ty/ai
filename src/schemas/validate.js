const schema = this.schema,
      validateSchema = new schema({
        user : String,
        password : String,
        sid : String,
        ttl : Date
      },{conllection:'elias_session'});

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
        this.find({user,password},function (err,data) {
            if(!data.length){
                return 'OK';
            }else{
                return 'None';
            }
        })
    }
}

module.exports = validateSchema;