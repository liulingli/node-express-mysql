import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import lessMiddleware from 'less-middleware';
import token from './public/token';
import { indexRouter } from './routes/index';
import { User, userRouter} from './routes/user';
import { Blog, blogRouter }  from './routes/blog';

let app = express();
let mysql = require("mysql");
let connection = require('./database');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//验证token登录中间件
app.use('/users',function(req,res,next){
   /* console.log(req);
    const tokenStr = req.params.token||req.query.token||req.headers.token||"";
    if(!token.checkToken(tokenStr)){
        res.json({success:false,message:"无效token"});
    }*/
    next();
});

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

let server = app.listen(8084,'localhost', function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("访问地址为 http://%s:%s", host, port)
});

export default app;
