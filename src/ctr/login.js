exports.getLogin = function*(){
    this.body =  this.nun.render('login/login.html',{
        title : '登录'
    })
}
