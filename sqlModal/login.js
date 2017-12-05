let connection = require('../database');
let token = require('../public/token');

const login =(param) =>{
    return new Promise((resolve,reject)=>{
        const sql = "SELECT * FROM users WHERE username='"+param.username+"'";
        connection.query(sql,function (err, result) {
            console.log(err, result)
            if(err){ //数据库内部错误code = 0
                resolve({success:false, code:0, result:result})
                return;
            }
            if(result.length == 0){ //没有找到该用户 code = -1
                resolve({success:false, code:-1, result:result})
            }else{
                if(result[0].password == param.password){ //成功登录 code = 1
                    const tokenStr = token.encodeToken(result[0],100000);
                    resolve({success:true, code:1, result:result[0],token:tokenStr})
                }else{ //密码错误 code = -2
                    resolve({success:false, code:-2, result:result})
                }
            }
        });
    })
};

module.exports = login;