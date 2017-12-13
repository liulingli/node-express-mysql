import express from 'express';
import moment from 'moment';
import { Sequelize, DataTypes}  from 'sequelize';
import sequelizeModal from '../database';
import uuid from '../public/uuid';

let userRouter = express.Router();
// 一条记录对应一个用户对象
let User = sequelizeModal.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    userName:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    trueName: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.INTEGER
    },
});

//新增用户
userRouter.post('/',function(req,res,next){
    console.log("新增",User)
    let options = req.body;
    User.sync({force: false}).then(() => {
        // 表已创建
        return User.create(options).then(function(response){
            res.json({success:true, result:response})
        }).catch(function(err){
            res.json({success:false, result:err})
        });
    });
});

//获取用户列表
userRouter.get('/', function(req, res, next) {
    let pageSize = req.query.pageSize || 20;
    let curPage = req.query.curPage;
    if(!curPage){
      res.json({success:false,code:-1,message:"没有传入参数curPage"})
    }
    User.findAndCountAll({
        offset: curPage - 1,
        limit: parseInt(pageSize)
    }).then(function(response){
        res.json({success:true, result:{total:response.count, list:response.rows}})
    }).catch(function(err){
        res.json({success:false, result:err})
    })
});

//获取用户信息
userRouter.get('/:id', function(req, res, next) {
    User.findAll({
        where: {
            id: req.params.id
        },
    }).then(function(response) {
        res.json({success:true, result:response})
    }).catch(function(err){
        res.json({success:false, result:err})
    })
});

//修改用户
userRouter.put('/',function(req,res,next){
    User.update(req.body, {
        where:{
            id: res.body.id
        }
    }).then(function(result){
        res.json({success:true,result:result})
    });
});

//删除用户
userRouter.delete('/:id',function(req,res,next){
    User.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(result){
        res.json({success:true,result:result})
    });
});

export { userRouter, User};
