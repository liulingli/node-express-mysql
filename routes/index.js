import express from 'express';
import { User, userRouter} from './user';

let indexRouter = express.Router();


//登录
indexRouter.post('/login',function(req, res, next){
    User.findAll({
        where: {
            userName: req.body.userName
        },
    }).then(function(response){
        console.log(response)
        if(response.length == 0){ //没有找到该用户 code = -1
            res.json({success:false, code:-1, result: response})
        }else{
            if(response[0].password == req.body.password){ //成功登录 code = 1
                //const tokenStr = token.encodeToken(result[0],100000);
                res.json({success:true, code:1, result:response[0]})
            }else{ //密码错误 code = -2
                res.json({success:true, code:-2, result:response[0]})
            }
        }
    }).catch(function(err){
        console.log("err",err)
        res.json({success:false, result:err})
    })
});

export { indexRouter };
