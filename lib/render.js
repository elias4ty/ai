const nunjucks = require('nunjucks');

module.exports = function(){

    return function* (next){

        this.nun = nunjucks.configure(global.BASE_PATH+'/src/views',{
            watch : true
        })

        yield * next
    }
}
