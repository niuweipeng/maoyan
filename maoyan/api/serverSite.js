const express = require("express");
const db = require("./module/db");
const mongodb = require("mongodb");
const tools = require("./module/tools");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.get("/login/send",async function(req,res){
    const phoneId = req.query.phoneId;
    const code = tools.getRandom(100000,999999);
    const info = await db.findOne("phoneCode",{phoneId});
	
    if(info){
        if(Date.now()-info.sendTime > 1000){
            db.updateOne("phoneCode",{phoneId},{
                $set:{
                    code,
                    sendTime:Date.now()
                }
            })
            res.json({
                ok:1,
                code,
                msg:"发送成功"
            })
        }else{
            res.json({
                ok:-1,
                msg:"验证码时间未过期，差"+Number.parseInt((1000 -Date.now()+info.sendTime)/1000)+"秒"
            })
        }
    }else{
        await db.insertOne("phoneCode",{
            phoneId,
            code,
            sendTime:Date.now()
        })
        res.json({
            ok:1,
            code,
            msg:"发送成功"
        })
    }
})
//注册！！！！！！！！！！！！！！！！！

app.post("/login/register",async function(req,res){
    const {phoneCode,passWord} = req.body;
		const AA= await db.findOne("userList",{
			phoneCode
		})
		console.log(AA)
		if(AA==null){
			await db.insertOne("userList",{
            phoneCode:phoneCode,
            passWord:passWord,
          
        })
        res.json({
            ok:1,
            msg:"注册成功"
        });
		}else{
			res.json({
				ok:-1,
				msg:"该账号已经存在，请登录"
			})
		}
			
	
        
    
});
//美团登录
app.post("/login/login",async function(req,res){
	console.log(req.body)
    const {phoneCode,passWord} = req.body;
    const result = await db.findOne("userList",{
        phoneCode,
		passWord
		
    });
    if(result){
        res.json({
            ok:1,
            phoneCode,
			msg:"登录成功"
        });
    }else{
        tools.json(res,-1,"账号或密码错误");
    }

})
//手机验证码
app.post("/login/plogin",async function(req,res){
	console.log(req.body)
	const code = tools.getRandom(100000,999999);
    const {phoneCode} = req.body;
    const result = await db.findOne("userList",{
        phoneCode,
    });
    if(result){
        res.json({
            ok:1,
            code
        });
    }else{
        tools.json(res,-1,"请输入已注册的手机号");
    }

})

app.post("/lllogin",async function(req,res){
    const {phoneId,code} = req.body.params;
    const info = await db.findOne("phoneCode",{
        phoneId,
        code:code/1
    })
    if(info){
        if((Date.now()-info.sendTime) < 1000*60*3){
            const userInfo = await db.findOne("userList",{phoneId})
            if(userInfo){
                db.updateOne("userList",{phoneId},{
                    $set:{
                        lastTime:Date.now()
                    }
                })
                res.json({
                    ok:1,
                    msg:"登录成功",
                    phoneId,
                    userToken:tools.enCode({
                        phoneId
                    })
                });
            }else{
                db.insertOne("userList",{
                    phoneId,
                    createTime:Date.now(),
                    lastTime:Date.now(),
                    money:0,
                })
                res.json({
                    ok:1,
                    msg:"登录成功",
                    phoneId,
                    userToken:tools.enCode({
                        phoneId
                    })
                });
            }
        }else{
            tools.json(res,-1,"验证码已过期");
        }
    }else{
        tools.json(res,-1,"请输入正确的验证码");
    }
})

app.get("/homeShopList",async function(req,res){
    const pageIndex = req.query.pageIndex/1;
    let pageSum = 1;
    let limit = 5;
    const count = await db.count("shopList");
    pageSum = Math.ceil(count/limit);
    if(pageSum < 1){pageSum = 1};
    if(pageIndex > pageSum){pageIndex = pageSum};
    if(pageIndex < 1){pageIndex = 1};
    const shopList = await db.find("shopList",{
        sortObj:{
            createTime:-1
        },
        limit,
        skip:(pageIndex - 1)*limit,
    })
    setTimeout(() => {
        res.json({
            ok:1,
            shopList,
            pageSum,
            pageIndex
        })
    }, 500);
})

app.get("/search",async function(req,res){
    const keyword = req.query.keyword;
    const shopList = await db.find("shopList",{
        whereObj:{
            shopName:new RegExp(keyword)
        },
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        shopList
    })
})

app.get("/shopTypeList",async function(req,res){
    const limit = (req.query.limit || 60)/1;
    const results = await db.find("shopTypeList",{
        sortObj:{
            createTime:-1
        },
        limit
    })
    res.json({
        ok:1,
        shopTypeList:tools.changeArr(results)
    })
})

app.get("/shopList",async function(req,res){
    const shopTypeId = req.query.shopTypeId;
    const shopList = await db.find("shopList",{
        whereObj:{
            shopTypeId:mongodb.ObjectId(shopTypeId)
        },
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        shopList
    })
})

app.get("/shopInfo",async function(req,res){
    const shopId = req.query.shopId;
    const shopInfo = await db.findOneById("shopList",shopId)
    res.json({
        ok:1,
        shopInfo
    })
})

app.get("/goodsTypeList",async function(req,res){
    const shopId = req.query.shopId;
    const goodsTypeList = await db.find("goodsTypeList",{
        whereObj:{
            shopId:mongodb.ObjectId(shopId)
        },
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        goodsTypeList
    })
})

app.get("/goodsByShopId",async function(req,res){
    const shopId = req.query.shopId;
    const goodsList = await db.find("goodsList",{
        whereObj:{
            shopId:mongodb.ObjectId(shopId)
        },
        sortObj:{
            createTime:-1
        }
    })
    res.json({
        ok:1,
        goodsList
    })
})

app.all("*",function(req,res,next){
    //headers.authorization
    const {ok,info} = tools.deCode(req.headers.authorization);
    tokenInfo = info;
    // console.log(status);
    if(ok !== 1){
        res.json({
            ok:-2// -2 代表token异常
        })
    }else{
        next();
    }
})	

app.get("/token",async function(req,res){
    res.json({
        ok:1,
        msg:"验证token"
    })
})

app.listen(80,function(){
    console.log("成功");
})