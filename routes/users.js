let express = require('express');
let router = express.Router();
let connection = require('../database');
let uuid = require('../public/uuid');

/* GET users listing. */
//获取用户列表
router.get('/', function(req, res, next) {
    let pageSize = req.query.pageSize||20;
    let curPage = req.query.curPage;
    if(!curPage){
      res.json({success:false,code:-1,message:"没有传入参数curPage"})   //
    }
    let start = (curPage - 1)*pageSize;
    let sql = 'SELECT COUNT(*) FROM users;SELECT * FROM users limit ' + start +','+pageSize;
    connection.query(sql,function (err, result) {
       // console.log(err,result)
        if(err){
            res.json({success:false,message:err.message,result:result});
            return;
        }
      // 计算总记录
      let allCount = result[0][0]['COUNT(*)'];
      let userList = result[1];
        res.json({success:true,message:'成功',result:{total:allCount,curPage:curPage,list:userList}})
    });
});

//新增用户
router.post('/',function(req,res,next){
    let username = req.body.username;
    let password = req.body.password;
    let regtime = new Date();
    let id = uuid(8,10);
    //插入数据
    let addSql = "INSERT INTO users(username,password,regtime,user_id) VALUES(?,?,?,?)";
    let addSqlParams = [username,password,regtime,id];
    console.log("addSqlParams",addSqlParams);
    connection.query(addSql,addSqlParams,function(err,result){
        console.log(err,result)
        if(err){
            res.json({success:false,result:{message:result.message}});
            return;
        }
        const tokenStr = token.encodeToken(result,100000);
        res.json({success:true,result:{username:username,password:password},token:tokenStr})
    });
})

//获取用户信息
router.get('/:id', function(req, res, next) {
    //res.send('respond with a resource');
    res.json({success:true})
});

//修改用户
router.put('/',function(req,res,next){
    //更新数据
    let updateSql = "UPDATE users SET name=?,url=? WHERE id=?";
    let updateParams = ['菜鸟移动站','https://m.runoob.com',0];
    connection.query(updateSql,updateParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        res.json({success:true})
    });
})

//删除用户
router.delete('/:id',function(req,res,next){
    let delSql = 'DELETE FROM users where user_id='+req.params.id;
    connection.query(delSql,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
        res.json({success:true,message:"删除成功"})
    });

})

module.exports = router;
