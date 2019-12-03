const mongodb = require("mongodb");
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");
const mongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017"
const uploadDir = path.resolve(__dirname,"../upload");

//连接数据库
function _connect(){
    return new Promise((resolve,reject)=>{
        mongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function (err,client){
            if(err){
                reject("连接失败");
            }else{
                const db = client.db("ele15");
                resolve(db);
            }
        })
    })
}

//插入一条文档记录  collName：集合名字  insertObj：插入的文档
module.exports.insertOne = async function (collName,insertObj){
    const db =  await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).insertOne(insertObj,function (err,results){
            if(err)
                reject(err);
            else
                resolve(results);
        })
    })
}

//根据条件获得文档数量  collName:集合名字   whereObj:条件
module.exports.count = async function (collName,whereObj = {}){
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).countDocuments(whereObj).then(num=>{
            resolve(num);
        })
    })
}

//获得集合内容
module.exports.find = async function (collName,{whereObj={},limit=0,skip=0,sortObj={}}){
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).find(whereObj).limit(limit).skip(skip).sort(sortObj).toArray((err,results)=>{
            if(err)
                reject(err);
            else
                resolve(results);
        })
    })
}

//查找一条
module.exports.findOne = async function (collName,whereObj){
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).findOne(whereObj,function(err,results){
            if(err)
                reject(err);
            else
                resolve(results);
        })
    })
}

//根据id查找
module.exports.findOneById = async function (collName,id){
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).findOne({_id:mongodb.ObjectId(id)},function(err,results){
            if(err)
                reject(err);
            else
                resolve(results);
        })
    })
}

//根据id更新数据
module.exports.updateOneById = async function (collName,_id,updateObj){
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).updateOne({_id:mongodb.ObjectId(_id)},updateObj,function (err,results){
            if(err)
                reject(err);
            else
                resolve(results);
        })
    })
}

//根据条件更新数据
module.exports.updateOne = async function (collName,whereObj,updateObj){
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).updateOne(whereObj,updateObj,function (err,results){
            if(err)
                reject(err);
            else
                resolve(results);
        })
    })
}

//根据id删除
module.exports.deleteOneById = async function (collName,id,){
    const db = await _connect();
    return new Promise((resolve,reject)=>{
        db.collection(collName).deleteOne({_id:mongodb.ObjectId(id)},function (err,results){
            if(err)
                reject(err);
            else
                resolve(results);
        })
    })
}

//上传图片
module.exports.upPic = function (req,advPic){
    const form = new formidable.IncomingForm();//实例化form对象，通过对象把接受的数据设置
    form.encoding = "utf-8";//指定编码格式
    form.uploadDir = uploadDir;//指定上传文件目录
    form.keepExtensions = true;//是否保留文件拓展名
    return new Promise((resolve,reject)=>{
        //将请求对象的数据进行转换 err:报错信息 params:除了上传文件之外的参数 file:上传的图片
        form.parse(req,function (err,params,file){
            const picInfo = file[advPic];
            if(err){
                fs.unlink(picInfo.path,function (err){
                    reject({ok:-1,msg:"网络连接错误"});
                })
            }else{
                if(picInfo.size <= 0){
                    fs.unlink(picInfo.path,function (err){
                        resolve({ok:2,params,msg:"请选择上传的文件"});
                    })
                }else{
                    const extNameArr = [".png",".gif",".jpg",".webp"];
                    const upExtName = path.extname(picInfo.path).toLowerCase();
                    if(extNameArr.includes(upExtName)){
                        params.advPic = Date.now()+upExtName;
                        fs.rename(picInfo.path,uploadDir+"/"+params.advPic,function (err){
                            resolve({ok:1,params,msg:"上传成功"})
                        })
                    }else{
                        fs.unlink(picInfo.path,function (err){
                            reject({ok:-1,msg:"请上传指定的文件格式：.png,.gif,.jpg,.webp"});
                        });
                    }
                }
            }
        })
    })
}