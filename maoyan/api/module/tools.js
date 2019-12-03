module.exports.getNowTime = function (){
    const date = new Date();
    return date.getFullYear()+"-"+
    (date.getMonth()+1)+"-"+
    date.getDate()+" "+
    date.getHours().toString().padStart(2,0)+":"+
    date.getMinutes().toString().padStart(2,0)+":"+
    date.getSeconds().toString().padStart(2,0);
}
// console.log(module.exports.getNowTime())

//res：响应对象
module.exports.json = function (res,ok = -1,msg = "网络连接错误"){
    res.json({
        ok,
        msg
    })
}
//md5加密
const md5 = require("md5");
module.exports.enMd5 = function (info){
    const str = "**``";
    return md5(info+str);
}
//生成token
const key = "@@&&$$"
const jwt = require("jwt-simple");
module.exports.enCode = function (info){
    return jwt.encode({
        ...info,
        ...{
            lastTime:Date.now()+1000*60*60*2,
        }
    },key)
}
//解析token
module.exports.deCode = function(token){
    //1失败 2成功但过期 3成功未过期
    try{
        const info = jwt.decode(token,key)
        if(info.lastTime < Date.now()){
            //过期
            return{
                ok:-1,
                msg:"token过期"
            }
        }else{
            //未过期
            return{
                ok:1,
                info
            }
        }
    }catch(err){
        //解析失败
        return{
            ok:-1,
            msg:"token异常"
        }
    }
}
//生成验证码
module.exports.getRandom = function (min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
//一维数组转换二维数组
module.exports.changeArr = function(arr,len=10){
    const newArr = [];
    for(var i=0;i<arr.length;i+=len){
        newArr.push(arr.slice(i,i+len));
    }
    return newArr;
}