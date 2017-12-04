//基于Token的身份验证方法
const crypto = require('crypto'); //加密模块

const token = {
    /**
     * @method 创建token
     * @param obj payload
     * @param timeout 时间有效期
     */
    encodeToken : function(obj,timeout) {
        const tokenJson = {
            data: obj,
            createAt: parseInt(new Date() / 1000), //token生成的时间单位秒
            exp: parseInt(timeout) || 0 //token有效期
        };
        //payload信息
        const base64Str = Buffer.from(JSON.stringify(tokenJson), 'utf8').toString('base64');
        //添加签名、防篡改
        const secret = 'www.liulinling.site';
        let hash = crypto.createHmac('sha256', secret);
        hash.update(base64Str);
        const signature = hash.digest('base64');
        return  base64Str + '.' + signature;
    },
    /**
     * @method 解析token
     * @param tokenStr
     * @returns {*}
     */
    decodeToken : function(tokenStr){
         const tokenArray =  tokenStr.split('.');
         if(tokenArray.length < 2){
              return false; //token不合法
         }
         let payload={};
         try{
             payload=JSON.parse(Buffer.from(tokenArray[0],"base64").toString("utf8"))
         }catch(err){
             return false;
         }
         //检验签名
        const secret="hel.h-five.com";
        let hash=crypto.createHmac('sha256',secret);
        hash.update(tokenArray[0]);
        let checkSignature=hash.digest('base64');
        return {
            payload:payload,
            signature:tokenArray[1],
            checkSignature:checkSignature
        }
    },
    /**
     * @method 验证token
     * @param tokenStr
     * @returns {boolean}
     */
    checkToken:function(tokenStr){
        var resDecode=this.decodeToken(tokenStr);
        if(!resDecode){
            return false;
        }

        //是否过期
        const expState=(parseInt(Date.now()/1000)-parseInt(resDecode.payload.createAt))>parseInt(resDecode.payload.exp)?false:true;
        if(resDecode.signature === resDecode.checkSignature && expState){
            return true;
        }
        return false;
    }
};

module.exports = token;