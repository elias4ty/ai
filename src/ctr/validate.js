const validateModel = require('../models/validate');

exports.getVali = async function (){

    let data = this.request.body.fields;

    let isCustomer = await validateModel.identify(data.user,data.pwd)

    if(isCustomer.length){

        // 这一步就是在浏览器中种下 session 的 cookie，配置在上文中
        this.session = {
          user: data.user,
          password: data.pwd
        }

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
