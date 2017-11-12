const url = require('url');

exports.getLogin = function*(){
    var query = url.parse(this.req.url,true).query;

    this.body =  this.nun.render('login/login.html',{
        title : '登录'
    })
}
