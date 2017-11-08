exports.getCtr = function*(){
    console.log('222222222222')
    this.body =  this.nun.render('index.html',{
        title : '首页'
    })
}
