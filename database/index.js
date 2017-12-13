let mysql = require("mysql");
let connection = mysql.createConnection({
    host : "sql9.freemysqlhosting.net",
    port: '3306',
    user : "sql9210308",
    password : "Rrj8eqc97M",
    database : "sql9210308",
    multipleStatements: true //允许多条语句查询
});
connection.connect();

/*
//创建表
connection.query("CREATE TABLE websites(Id int,name varchar(255),url varchar(255),alexa varchar(255),country varchar(255))", function (err, result) {
    if(err){
        console.log(err.message);
        return;
    }
    console.log("创建websites表成功");
});

//查询数据
var  sql = 'SELECT * FROM websites WHERE id=0';
connection.query(sql,function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

//插入数据
let addSql = "INSERT INTO websites(id,name,url,alexa,country) VALUES(?,?,?,?,?)";
let addSqlParams = ['菜鸟工具','https://c.runoob.com','23453','CN'];
connection.query(addSql,addSqlParams,function(err,result){
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }
    console.log('--------------------------INSERT----------------------------');
    console.log('INSERT ID:',result);
    console.log('-----------------------------------------------------------------\n\n');
});

//更新数据
let updateSql = "UPDATE websites SET name=?,url=? WHERE id=?";
let updateParams = ['菜鸟移动站','https://m.runoob.com',0];
connection.query(updateSql,updateParams,function (err, result) {
    if(err){
        console.log('[UPDATE ERROR] - ',err.message);
        return;
    }
    console.log('--------------------------UPDATE----------------------------');
    console.log('UPDATE affectedRows',result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});

//删除数据
let delSql = 'DELETE FROM websites where id=1';
connection.query(delSql,function (err, result) {
    if(err){
        console.log('[DELETE ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------DELETE----------------------------');
    console.log('DELETE affectedRows',result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});


connection.end();*/

module.exports = connection;
