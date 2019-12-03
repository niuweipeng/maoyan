import React from "react"
import cinema from "../../state/cinema"
const cinemaReducer = (state=cinema,action)=>{
    state = JSON.parse(JSON.stringify(state));
    if(action.type==="GET_CINEMAS"){//影院列表的渲染数据
        if(action.payload.type===1){
            state.cinema = state.cinema.concat(action.payload.cinemas);
            state.offset = action.payload.offset;//，跳过多少条
        }else{
            state.cinema = action.payload.cinemas;
        }
    }
    if(action.type==="GET_SUBITEMS"){//得到商区或地铁列表数据
        state.subItems = null;//每次调用时，重置该数组，防止残留数据污染
        state.subItems = action.payload.subItems;
        state.typeNum = action.payload.typeNum;
    }
    if(action.type==="CHANGE_ALLCITYSHOW"){//判断全城组件是否应该展示
        state.allBrandShow = false;
        state.allCharacterShow = false;
        state.allCityShow =!state.allCityShow;
    }
    if(action.type==="CHANGE_ALLBRANDSHOW"){//判断品牌组件是否应该展示
        state.allCityShow = false;
        state.allCharacterShow = false;
        state.allBrandShow =!state.allBrandShow;
    }
    if(action.type==="CHANGE_ALLCHARACTERSHOW"){//判断特色组件是否应该展示
        state.allCityShow = false;
        state.allBrandShow = false;
        state.allCharacterShow =!state.allCharacterShow;
    }
    if(action.type==="CHANGE_SUBITEMSID"){//点击左侧商区或地铁站得到Id
        state.subItemsId = action.payload.id;
    }
    if(action.type==="CHANGE_DETAILNAME"){//改变全城箭头左侧文字显示
        state.detaiCitylName = action.payload.detaiCitylName
    }
    if(action.type==="CHANGE_BRANDNAME"){//改变品牌箭头左侧文字显示
        state.detaiBrandName = action.payload.detaiBrandName
    }
    if(action.type==="GET_BRAND"){//获取所有品牌的数据
        state.brand = action.payload.brand;
    }
    if(action.type==="GET_CHARACTER"){//获取所有特色数据
        state.hallType = action.payload.hallType;
        state.service = action.payload.service;
    }
    if(action.type==="CHANGE_CHARACTERCOLOR"){
        state.characterColor = action.payload.characterColor
    }
    return state;
}
export default cinemaReducer