const express = require("express");
const db = require("./module/db");
const mongodb = require("mongodb");
const tools = require("./module/tools");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));
app.post("/login",async function(req,res){
    const {adminName,passWord} = req.body;
    const result = await db.findOne("adminList",{
        adminName,
        passWord:tools.enMd5(passWord)
    });
    if(result){
        await db.insertOne("adminLog",{
            adminId:result._id,
            adminName,
            loginTime:Date.now()
        })
        res.json({
            ok:1,
            adminName,
            token:tools.enCode({
                adminName
            })
        });
    }else{
        tools.json(res,-1,"账号或密码错误");
    }
});
app.get("/adminLog",async function(req,res){
    const {ok,info} = tools.deCode(req.headers.authorization);
    if(ok !== 1){
        res.json({
            ok:-2,
            msg:"token异常"
        })
    }else{
        const adminName = info.adminName;
        const pageIndex = req.query.pageIndex/1;
        let pageSum = 1;
        let limit = 5;
        const count = await db.count("adminLog",{
            adminName
        });
        pageSum = Math.ceil(count/limit);
        if(pageSum < 1){pageSum = 1};
        if(pageIndex > pageSum){pageIndex = pageSum};
        if(pageIndex < 1){pageIndex = 1};
        const adminLog = await db.find("adminLog",{
            whereObj:{
                adminName
            },
            sortObj:{
                loginTime:-1
            },
            limit,
            skip:(pageIndex - 1)*limit,
        })
        res.json({
            ok:1,
            adminLog,
            pageSum,
            pageIndex
        })
    }
})
//********************店铺类别********************
app.post("/shopTypeList",async function (req,res){
    const results = await db.upPic(req,"shopTypePic");
    if(results.ok === 1){
        await db.insertOne("shopTypeList",{
            shopTypeName:results.params.shopTypeName,
            shopTypePic:results.params.advPic,
            createTime:Date.now()
        })
        tools.json(res,1,"添加成功")
    }else{
        tools.json(res)
    }
})
app.get("/shopTypeList",async function(req,res){
    const pageIndex = req.query.pageIndex/1;
    let pageSum = 1;
    let limit = 5;
    const whereObj = {};
    const shopTypeName = req.query.shopTypeName || "";
    if(shopTypeName.length > 0){
        whereObj.shopTypeName = new RegExp(shopTypeName);
    }
    const count = await db.count("shopTypeList",whereObj);
    pageSum = Math.ceil(count/limit);
    if(pageSum < 1){pageSum = 1};
    if(pageIndex > pageSum){pageIndex = pageSum};
    if(pageIndex < 1){pageIndex = 1};
    const shopTypeList = await db.find("shopTypeList",{
        whereObj,
        sortObj:{
            createTime:-1
        },
        limit,
        skip:(pageIndex - 1)*limit,
    })
    res.json({
        ok:1,
        shopTypeList,
        pageSum,
        pageIndex
    })
})
app.get("/allShopTypeList",async function(req,res){
    const shopTypeList = await db.find("shopTypeList",{
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        shopTypeList
    })
})
//********************店铺************************
app.post("/shopList",async function(req,res){
    const results = await db.upPic(req,"shopPic");
    if(results.ok === 1){
        const shopTypeList = await db.findOneById("shopTypeList",results.params.shopTypeId)
        await db.insertOne("shopList",{
            shopName:results.params.shopName,
            shopTypeId:shopTypeList._id,
            shopTypeName:shopTypeList.shopTypeName,
            shopPic:results.params.advPic,
            isTop:results.params.isTop==="true",
            createTime:Date.now()
        })
        tools.json(res,1,"添加成功")
    }else{
        tools.json(res)
    }
})
app.get("/shopList",async function(req,res){
    const pageIndex = req.query.pageIndex/1;
    let pageSum = 1;
    let limit = 5;
    const whereObj = {};
    if(req.query.shopTypeId.length > 0){
        whereObj.shopTypeId = mongodb.ObjectId(req.query.shopTypeId);
    }
    const count = await db.count("shopList",whereObj);
    pageSum = Math.ceil(count/limit);
    if(pageSum < 1){pageSum = 1};
    if(pageIndex > pageSum){pageIndex = pageSum};
    if(pageIndex < 1){pageIndex = 1};
    const shopList = await db.find("shopList",{
        whereObj,
        sortObj:{
            createTime:-1
        },
        limit,
        skip:(pageIndex - 1)*limit,
    })
    res.json({
        ok:1,
        shopList,
        pageSum,
        pageIndex
    })
})
app.get("/shopListByTypeId/:shopTypeId",async function(req,res){
    const shopList = await db.find("shopList",{
        whereObj:{
            shopTypeId:mongodb.ObjectId(req.params.shopTypeId)
        },
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        shopList
    })
});
//********************商品类别*********************
app.post("/goodsTypeList",async function(req,res){
    const {shopTypeId,shopTypeName,_id,shopName} = await db.findOneById("shopList",req.body.shopId);
    await db.insertOne("goodsTypeList",{
        shopTypeId,
        shopTypeName,
        shopId:_id,
        shopName,
        goodsTypeName:req.body.goodsTypeName,
        createTime:Date.now()
    })
    res.json({
        ok:1,
        msg:"插入成功"
    })
})
app.get("/goodsTypeList",async function(req,res){
    const pageIndex = req.query.pageIndex/1;
    let pageSum = 1;
    let limit = 5;
    const whereObj = {};
    const goodsTypeName = req.query.goodsTypeName || "";
    if(goodsTypeName.length > 0){
        whereObj.goodsTypeName = new RegExp(goodsTypeName);
    }
    const count = await db.count("goodsTypeList",whereObj);
    pageSum = Math.ceil(count/limit);
    if(pageSum < 1){pageSum = 1};
    if(pageIndex > pageSum){pageIndex = pageSum};
    if(pageIndex < 1){pageIndex = 1};
    const goodsTypeList = await db.find("goodsTypeList",{
        whereObj,
        sortObj:{
            createTime:-1
        },
        limit,
        skip:(pageIndex - 1)*limit,
    })
    res.json({
        ok:1,
        goodsTypeList,
        pageSum,
        pageIndex
    })
})
app.get("/goodsTypeListById/:shopId",async function(req,res){
    const goodsTypeList = await db.find("goodsTypeList",{
        whereObj:{
            shopId:mongodb.ObjectId(req.params.shopId)
        },
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        goodsTypeList
    })
});
//********************商品*************************
app.post("/goodsList",async function(req,res){
    const results = await db.upPic(req,"goodsPic");
    if(results.ok === 1){
        const goodsTypeList = await db.findOneById("goodsTypeList",results.params.goodsTypeId)
        await db.insertOne("goodsList",{
            goodsName:results.params.goodsName,
            shopTypeId:goodsTypeList.shopTypeId,
            shopTypeName:goodsTypeList.shopTypeName,
            shopId:goodsTypeList.shopId,
            shopName:goodsTypeList.shopName,
            goodsTypeId:goodsTypeList._id,
            goodsTypeName:goodsTypeList.goodsTypeName,
            price:results.params.price,
            goodsPic:results.params.advPic,
            isTop:results.params.isTop==="true",
            isHot:results.params.isHot==="true",
            createTime:Date.now()
        })
        tools.json(res,1,"添加成功")
    }else{
        tools.json(res)
    }
})
app.get("/goodsList",async function(req,res){
    const pageIndex = req.query.pageIndex/1;
    let pageSum = 1;
    let limit = 5;
    const count = await db.count("goodsList");
    pageSum = Math.ceil(count/limit);
    if(pageSum < 1){pageSum = 1};
    if(pageIndex > pageSum){pageIndex = pageSum};
    if(pageIndex < 1){pageIndex = 1};
    const goodsList = await db.find("goodsList",{
        sortObj:{
            createTime:-1
        },
        limit,
        skip:(pageIndex - 1)*limit,
    })
    res.json({
        ok:1,
        goodsList,
        pageSum,
        pageIndex
    })
})
app.listen(8088,function(){
    console.log("成功");
})