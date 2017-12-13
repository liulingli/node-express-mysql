import express from 'express';
import moment from 'moment';
import Sequelize from 'sequelize';
import sequelizeModal from '../database';
import uuid from '../public/uuid';

let router = express.Router();

// 一条记录对应一个用户对象
let User = sequelizeModal.define('user', {
    timestamps: true,
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    userName:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    trueName: Sequelize.STRING,
    password: Sequelize.STRING,
    mail: Sequelize.STRING,
    phone: Sequelize.NUMBER,
});

//获取用户列表
router.get('/', function(req, res, next) {
    let pageSize = req.query.pageSize||20;
    let curPage = req.query.curPage;
    if(!curPage){
      res.json({success:false,code:-1,message:"没有传入参数curPage"})   //
    }
    User.findAll({ offset: 5, limit: 5 }).then(function(response){

    }).catch(function(error){

    })
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
    User.update(req.body, {
        where:{
            id: res.body.id
        }
    }).then(function(result){
        res.json({success:true,result:result})
    });
});

//删除用户
router.delete('/:id',function(req,res,next){
    User.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(result){
        res.json({success:true,result:result})
    });
});

module.exports = router;
