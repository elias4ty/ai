const validateModel = require('../models/validate');

exports.getVali = async function (){

    let data = this.request.body.fields;

    let isCustomer = await validateModel.identify(data.user,data.pwd)

    if(isCustomer.length){
        this.body = {
           status: 'ok',
           url : data.referer
        }
    }else{
        this.body = {
            status : 'fail',
            message : '用户名或者密码错误！'
        }
    }
}
