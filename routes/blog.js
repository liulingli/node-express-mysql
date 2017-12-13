import express from 'express';
import moment from 'moment';
import { Sequelize, DataTypes}  from 'sequelize';
import sequelizeModal from '../database';
import { User } from './user'

let blogRouter = express.Router();

// 一条记录对应一个博客对象
let Blog = sequelizeModal.define('blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // 这是引用另一个模型
            key: 'id' // 这是引用模型的列名称
        }
    },
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    tags: DataTypes.STRING,
    createAt: DataTypes.DATE,
    publishAt: DataTypes.DATE,
    readCount: DataTypes.INTEGER
});

//新增博客
blogRouter.post('/',function(req,res,next){
    let options = req.body;
    Blog.sync({force: true}).then(() => {
        // 表已创建
        return Blog.create(options).then(function(response){
            res.json({success:true, result:response})
        }).catch(function(err){
            res.json({success:false, result:err})
        });
    });
});


//获取博客列表
blogRouter.get('/', function(req, res, next) {
    let pageSize = req.query.pageSize||20;
    let curPage = req.query.curPage;
    if(!curPage){
        res.json({success:false,code:-1,message:"没有传入参数curPage"})
    }
    Blog.findAndCountAll({
        offset: curPage,
        limit: pageSize
    }).then(function(response){
        res.json({success:true, result:response})
    }).catch(function(error){
        res.json({success:false, result:err})
    })
});


//获取博客信息
blogRouter.get('/:id', function(req, res, next) {
    Blog.findAll({
        where: {
            id: req.params.id
        },
    }).then(function(response){
        res.json({success:true, result:response})
    }).catch(function(err){
        res.json({success:false, result:err})
    })
});

//修改博客
blogRouter.put('/',function(req,res,next){
    Blog.update(req.body, {
        where:{
            id: res.body.id
        }
    }).then(function(result){
        res.json({success:true,result:result})
    });
});

//删除博客
blogRouter.delete('/:id',function(req,res,next){
    Blog.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(result){
        res.json({success:true,result:result})
    });
});

export  { blogRouter, Blog };

