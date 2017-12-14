import express from 'express';
import moment from 'moment';
import { Sequelize }  from 'sequelize';
import sequelizeModal from '../database';
import { User } from './user'

let blogRouter = express.Router();

// 一条记录对应一个博客对象
let Blog = sequelizeModal.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User, // 这是引用另一个模型
            key: 'id' // 这是引用模型的列名称
        }
    },
    author: Sequelize.TEXT,
    status: Sequelize.INTEGER, // 1已发布，2未发布
    title: Sequelize.TEXT,
    content: Sequelize.TEXT,
    tags: Sequelize.TEXT,
    publishAt: Sequelize.DATE,
    readCount: Sequelize.INTEGER
});

//新增博客
blogRouter.post('/',function(req,res,next){
    let options = req.body;
    options.status = 1;
    Blog.sync({force: false}).then(() => {
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
    Blog.sync({force: false}).then(()=>{
        Blog.findAndCountAll({
            offset: curPage - 1,
            limit: parseInt(pageSize)
        }).then(function(response){
            res.json({success:true, result:{total:response.count, list:response.rows}})
        }).catch(function(err){
            res.json({success:false, result:err})
        })
    })
});


//获取博客信息
blogRouter.get('/:id', function(req, res, next) {
    Blog.sync({force: false}).then(()=>{
        Blog.findAll({
            where: {
                id: req.params.id
            },
        }).then(function(response){
            res.json({success:true, result:response})
        }).catch(function(err){
            res.json({success:false, result:err})
        })
    })
});

//修改博客
blogRouter.put('/:id',function(req,res,next){
    Blog.sync({force: false}).then(()=> {
        Blog.update(req.query, {
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json({success: true, result: result})
        });
    })
});

//发布博客
blogRouter.put('/:id/publish',function(req,res,next){
    const publishAt = new Date();
    const option = {
        status: 2,
        publishAt:publishAt
    };
    Blog.sync({force: false}).then(()=> {
        Blog.update(option, {
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json({success: true, result: result})
        });
    })
});

//撤销发布博客
blogRouter.put('/:id/unPublish',function(req,res,next){
    const option = {
        status: 1
    };
    Blog.sync({force: false}).then(()=> {
        Blog.update(option, {
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json({success: true, result: result})
        });
    })
});

//删除博客
blogRouter.delete('/:id',function(req,res,next){
    Blog.sync({force: false}).then(()=> {
        Blog.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            res.json({success: true, result: result})
        });
    })
});

export  { blogRouter, Blog };

