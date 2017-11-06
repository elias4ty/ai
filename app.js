const Koa = require('koa'),
      app = new Koa(),
      session = require('koa-session-minimal'),
      mongo = require('koa-generic-session-mongo');
const router = require('koa-router')();
const render = require('./lib/render');
const nginx_router = require('./src/router/router');

app.use(render());

app.use(router.routes())
.use(router.allowedMethods());

nginx_router(router);

var st = new mongo({
  host : '127.0.0.1',
  port : '27017',
  db : 'ty',
  username : 'elias',
  password : '1990423',
  collection : 'elias_session',
  ttl : 1000*60*60*24*3
});

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
  console.log(ctx.session)

  // 已登录
  if(ctx.cookies.get('ELIAS_SESSION')){
    ctx.body = `ELIAS_SESSION:${ctx.cookies.get('ELIAS_SESSION')}`
  }
  // 未登录
  else{
    // 这一步就是在浏览器中种下 session 的 cookie，配置在上文中
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = '请先登录'
  }
})

app.listen(3000,function(){
  console.log('listen at 3000')
})
