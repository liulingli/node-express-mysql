let express = require('express');
let router = express.Router();
let login = require('../sqlModal/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//登录
router.post('/login',function(req,res,next){
    let param = req.body;
    login(param).then(function(response){
        res.json(response)
    })
});

module.exports = router;
