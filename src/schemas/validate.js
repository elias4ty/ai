const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      validateSchema = new schema({
        user : String,
        password : String
      },{collection:'customer'});

validateSchema.statics = {
    identify(user,password){
        var that = this;
        return new Promise((rv,rj) =>{
            that.find({user,password},(err,data) => {
                if(err) rj(err)
                rv(data)
            })
        })

    }
}

module.exports = validateSchema;
