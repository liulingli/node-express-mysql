import express from 'express';
import moment from 'moment';
import Sequelize from 'sequelize';
import sequelizeModal from '../database';

let router = express.Router();

// 一条记录对应一个博客对象
let Blog = sequelizeModal.define('blog', {
    timestamps: true,
    id: { type: Sequelize.NUMBER, primaryKey: true },
    userId: {
        type: Sequelize.NUMBER,
        references: {
            model: User, // 这是引用另一个模型
            key: 'id' // 这是引用模型的列名称
        }
    },
    author: Sequelize.STRING,
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    tags: Sequelize.STRING,
    createAt: Sequelize.Date,
    publishAt: Sequelize.Date,
    readCount: Sequelize.NUMBER
});

//新增博客
router.post('/',function(req,res,next){
    let options = req.body;
    Blog.sync({force: true}).then(() => {
        // 表已创建
        return Blog.create(options).then(function(response){

        }).catch(function(err){

        });
    });
});


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
        console.log(err,result)
        if(err){
            res.json({success:false,message:err.message,result:result});
            return;
        }
        // 计算总记录
        let allCount = result[0][0]['COUNT(*)'];
        let userList = result[1];
        userList.map((v,i)=>{
            v['alter_time'] = moment(v['alter_time']).format('YYYY-MM-DD HH:mm:ss');
            return v;
        });
        console.log(userList)
        res.json({success:true,message:'成功',result:{total:allCount,curPage:curPage,list:userList}})
    });
});


//获取博客信息
router.get('/:id', function(req, res, next) {
    let sql = 'SELECT * FROM blog WHERE tid='+req.params.id;
    connection.query(sql,function (err, result) {
        if(err){
            res.json({success:false,result:{message:result.message}});
            return;
        }
        result[0]['alter_time'] = moment(result[0]['alter_time']).format('YYYY-MM-DD HH:mm:ss');
        console.log(result[0])
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

