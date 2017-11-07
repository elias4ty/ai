exports.getCtr = function*(){
    this.body =  this.nun.render('index.html',{
        title : '首页'
    })
}
