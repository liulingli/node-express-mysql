let express = require('express');
let router = express.Router();
let connection = require('../database');

/* GET users listing. */
//获取用户列表
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.json({success:true})
});

//新增用户
router.post('/',function(req,res,next){
    let username = req.body.userName;
    let password = req.body.password;
    //插入数据
    let addSql = "INSERT INTO users(username,password) VALUES(?,?)";
    let addSqlParams = [username,password];
    console.log("addSqlParams",addSqlParams)
    connection.query(addSql,addSqlParams,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:',result);
        res.json({success:true,result:result})
        console.log('-----------------------------------------------------------------\n\n');
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
