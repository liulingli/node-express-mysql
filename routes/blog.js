let express = require('express');
let router = express.Router();
let connection = require('../database');

//获取博客列表
router.get('/', function(req, res, next) {
    let pageSize = req.query.pageSize||20;
    let curPage = req.query.curPage;
    if(!curPage){
        res.json({success:false,code:-1,message:"没有传入参数curPage"})   //
    }
    curPage = parseInt(curPage);
    let start = (curPage - 1)*pageSize;
    let sql = 'SELECT COUNT(*) FROM blog;SELECT * FROM blog limit ' + start +','+pageSize;
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

//新增博客
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
        res.json({success:true,result:{username:username,password:password}})
    });
})

//获取博客信息
router.get('/:id', function(req, res, next) {
    let sql = 'SELECT * FROM blog WHERE tid='+req.params.id;
    connection.query(sql,function (err, result) {
        if(err){
            res.json({success:false,result:{message:result.message}});
            return;
        }
        res.json({success:true,result:result[0]})
    });
});

//修改博客
router.put('/',function(req,res,next){
    res.json({success:true})
})

//删除博客
router.delete('/:id',function(req,res,next){
    res.json({success:true})
})

module.exports = router;

