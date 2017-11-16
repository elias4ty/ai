global.BASE_PATH = __dirname;
global.ENV = process.argv[2];

const Koa = require('koa'),
      app = new Koa(),
      session = require('koa-session-minimal'),
      mongo = require('koa-generic-session-mongo'),
      router = require('koa-router')(),
      render = require('./lib/render'),
      nginx_router = require('./src/router/router'),
      // 只能处理简单数据，无法处理 formdata 等复复杂数据。弃用
      //bodyParser = require('koa-bodyparser'),
      DBHander = require('./lib/DBHandler'),
      koaBody = require('koa-body'), // 用来处理 post 传送的 formdata 复杂类型数据
      config = require('./lib/config');

var st = new mongo({
  host : '127.0.0.1',
  port : '27017',
  db : 'ty',
  username : 'elias',
  password : '1990423',
  collection : 'elias_session'
});

// app.use(bodyParser());
app.use(koaBody({multipart: true}));
app.use(render());
app.use(DBHander());

app.use(
  session({
    key : 'ELIAS_SESSION', // session cooike 的名字
    store : st,
    cookie : {
      maxAge : 1000*60*60*24*2, // session cooike 的有效时间，0 为 'session'，即浏览器关闭
      path : '/',
      domain : config.domain()
    }
  })
)

app.use(async (ctx,next) => {

  //已登录
  if(ctx.cookies.get('ELIAS_SESSION')){
    console.log(`ELIAS_SESSION:${ctx.cookies.get('ELIAS_SESSION')}`)
    await next()
  }
  else if(/(login|validate)/g.test(ctx.path)){
      await next()
  }
  // 未登录
  else{
      ctx.redirect('/login?referer='+ctx.url);
  }
})

app.use(router.routes())
.use(router.allowedMethods());

nginx_router(router);

app.listen(1109,function(){
  console.log('listen at 1109')
})
