import Tools from "../../../filters/tools";
//修改全城组件是否显示
export const allCityShow = ()=>{
    return{
        type:"CHANGE_ALLCITYSHOW",
    }
}
//修改品牌组件是否显示
export const allBrandShow = ()=>{
    return{
        type:"CHANGE_ALLBRANDSHOW",
    }
}
//修改特色组件是否显示
export const allCharacterShow = ()=>{
    return{
        type:"CHANGE_ALLCHARACTERSHOW",
    }
}
//改变全城箭头的文字提示
export const changeDetailName = (detaiCitylName)=>{
    return{
        type:"CHANGE_DETAILNAME",
        payload:{
            detaiCitylName
        }
    }
}
//改变品牌箭头的文字提示
export const changeBrandName = (detaiBrandName)=>{
    return{
        type:"CHANGE_BRANDNAME",
        payload:{
            detaiBrandName
        }
    }
}
//改变标题特色名称的颜色
export const changeCharacterColor = (characterColor)=>{
    return{
        type:"CHANGE_CHARACTERCOLOR",
        payload:{
            characterColor
        }
    }
}

//改变从左边拿到的Id
export const getSubItemsId = (id)=>{
    return{
        type:"CHANGE_SUBITEMSID",
        payload:{
            id
        }
    }
}
//获取所有的影院
export const cinemas = (cinemas=[],offset=0,type=-1)=>{
    return{
        type:"GET_CINEMAS",
        payload:{
            cinemas,
            offset,
            type
        }
    }
}
//获取行政区
export const subItems = (subItems,typeNum)=>{
    return{
        type:"GET_SUBITEMS",
        payload:{
            typeNum,
            subItems
        }
    }
}
//获取所有的品牌
export const brand = (brand)=>{
    return{
        type:"GET_BRAND",
        payload:{
            brand
        }
    }
}
//获取所有的特色
export const character = (hallType,service)=>{
    return{
        type:"GET_CHARACTER",
        payload:{
            hallType,
            service
        }
    }
}

const cinema = {
    getCinemaSmall(params){
        console.log(Tools.filDate(),"kfdhhhhhhhhhhhh");
        let {day=localStorage.dayDay?localStorage.dayDay:Tools.filDate(),offset=0,limit=20,districtId=localStorage.districtId,lineId=localStorage.lineId,hallType=localStorage.hallType,brandId=localStorage.brandId,serviceId=localStorage.serviceId,areaId=localStorage.areaId,stationId=localStorage.stationId,item=-1,updateShowDay=true,reqId=Date.now(),cityId=1,movieId=localStorage.movieId?localStorage.movieId:"-1"} = params || ""
        return async (dispatch)=>{
            const data = await this.$axios.post("/ajax/movie?"+"forceUpdate="+new Date(),{
                    day,
                    offset,
                    limit,
                    districtId,
                    lineId,
                    hallType,
                    brandId,
                    serviceId,
                    areaId,
                    stationId,
                    item,
                    updateShowDay,
                    reqId,
                    cityId,
                    movieId
            })
            dispatch(cinemas(data.cinemas,offset))
        }
    },
    getCinema(params){//获得所有的影院，渲染当前页面
        let {day=Tools.filDate(),offset=0,limit=20,districtId=localStorage.districtId,lineId=localStorage.lineId,hallType=localStorage.hallType,brandId=localStorage.brandId,serviceId=localStorage.serviceId,areaId=localStorage.areaId,stationId=localStorage.stationId,item=-1,updateShowDay=true,reqId=Date.now(),cityId=localStorage.maoyan_position.nm,type=-1} = params || ""
        return async (dispatch)=>{
            const data = await this.$axios.get("/ajax/cinemaList",{
                params:{
                    day,
                    offset,
                    limit,
                    districtId,
                    lineId,
                    hallType,
                    brandId,
                    serviceId,
                    areaId,
                    stationId,
                    item,
                    updateShowDay,
                    reqId,
                    cityId,
                    type
                }
            })
            dispatch(cinemas(data.cinemas,offset,type))
        }
    },
    getAllCity(typeNum=1){//根据类型获取商区或者地铁站
        return async (dispatch)=>{
            const data = await this.$axios.get("/ajax/filterCinemas",{
                params:{
                    ci:1
                }
            })
            if(typeNum===1){
                dispatch(subItems(data.district.subItems,typeNum))
            }
            else{
                dispatch(subItems(data.subway.subItems,typeNum))
            }
        }
    },
    getBrand(){//获取品牌里面的所有数据
        return async (dispatch)=>{
            const data = await this.$axios.get("/ajax/filterCinemas",{
                params:{
                    ci:1
                }
            })
            dispatch(brand(data.brand.subItems))
        }
    },
    getCharacter(){//获取特色面的所有数据
        return async (dispatch)=>{
            const data = await this.$axios.get("/ajax/filterCinemas",{
                params:{
                    ci:1
                }
            })
            dispatch(character(data.hallType.subItems,data.service.subItems))
        }
    }
}
export default cinema;
