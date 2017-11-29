var express = require('express');
var router = express.Router();

/* GET users listing. */
//获取用户列表
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.json({success:true})
});

//新增用户
router.post('/',function(req,res,next){
    console.log(req);
    let username = req.body.userName;
    let password = req.body.password;
    res.json({success:true})
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
