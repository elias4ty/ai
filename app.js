global.BASE_PATH = __dirname;

const Koa = require('koa'),
      app = new Koa(),
      session = require('koa-session-minimal'),
      mongo = require('koa-generic-session-mongo'),
      router = require('koa-router')(),
      render = require('./lib/render'),
      nginx_router = require('./src/router/router'),
      bodyParser = require('koa-bodyparser'),
      DBHander = require('./lib/DBHandler');

var st = new mongo({
  host : '127.0.0.1',
  port : '27017',
  db : 'ty',
  username : 'elias',
  password : '1990423',
  collection : 'elias_session'
});

app.use(bodyParser());
app.use(render());
app.use(DBHander());

app.use(
  session({
    key : 'ELIAS_SESSION', // session cooike 的名字
    store : st,
    cookie : {
      maxAge : 1000*60*60*24*2, // session cooike 的有效时间，0 为 'session'，即浏览器关闭
      path : '/',
      domain : 'localhost'
    }
  })
)

app.use(async (ctx,next) => {
  console.log(`cookies:${ctx.cookies.get('ELIAS_SESSION')}`)
  console.log(`ctx.session:${ctx.session}`)

  //已登录
  if(ctx.cookies.get('ELIAS_SESSION')){
    console.log(`ELIAS_SESSION:${ctx.cookies.get('ELIAS_SESSION')}`)
    await next()
  }
  // 未登录
  else{
    // 这一步就是在浏览器中种下 session 的 cookie，配置在上文中
      ctx.session = {
        user_id: Math.random().toString(36).substr(2),
        count: 0
      }
      ctx.redirect('/login');
  }
})

app.use(router.routes())
.use(router.allowedMethods());

nginx_router(router);

app.listen(1109,function(){
  console.log('listen at 1109')
})
