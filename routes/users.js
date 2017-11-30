let express = require('express');
let router = express.Router();
let connection = require('../database');
let uuid = require('../public/uuid');

/* GET users listing. */
//获取用户列表
router.get('/', function(req, res, next) {
    var  sql = 'SELECT * FROM users';
    connection.query(sql,function (err, result) {
        if(err){
            res.json({success:false,message:err.message,result:result})
            return;
        }
        res.json({success:true,message:'成功',result:result})
    });

});

//新增用户
router.post('/',function(req,res,next){
    let username = req.body.userName;
    let password = req.body.password;
    let id = uuid(8,10);
    //插入数据
    let addSql = "INSERT INTO users(username,password,id) VALUES(?,?,?)";
    let addSqlParams = [username,password,id];
    console.log("addSqlParams",addSqlParams);
    connection.query(addSql,addSqlParams,function(err,result){
        if(err){
            res.json({success:false,result:{message:result.message}});
            return;
        }
        res.json({success:true,result:{username:username,password:password,id:id}})
    });
})

//获取用户信息
router.get('/:id', function(req, res, next) {
    //res.send('respond with a resource');
    res.json({success:true})
});

//修改用户
router.put('/',function(req,res,next){
    res.json({success:true})
})

//删除用户
router.delete('/:id',function(req,res,next){
    res.json({success:true})
})

module.exports = router;
