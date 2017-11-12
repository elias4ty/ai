function *getCtr(){
    this.body =  this.nun.render('./face/index.html',{
        title : '首页'
    })
}

module.exports = {
   getCtr
}