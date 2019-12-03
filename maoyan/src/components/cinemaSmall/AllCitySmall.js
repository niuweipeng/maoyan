import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
import "../../assets/iconfont/iconfont.css"
import "../../assets/css/cinemaSmall/allCity.css"
import CityDetailSmall from "./cityDetailSmall"
import cinemaActionCreatore,{changeDetailName,allCityShow,getSubItemsId} from "../../store/action/cinema"
class AllCity extends React.Component{
render(){
    return (
        <div className={"allCity2"} style={{display:this.props.allCityShow?"block":"none"}}>
            <div className={"allCityHead2"}>
                    <div className={"cityHead12"} onClick={()=>{this.props.getSort.call(this,1)}}>商区</div>
                <div className={"cityHead12"} onClick={()=>{this.props.getSort.call(this,2)}}>地铁站</div>
            </div>
            <div className={"cityBody2"}>
                <ul className={"cityBodyLeft2"}>
                    {
        this.props.subItems.map(v=>(
      <li key={v.id} className={"cityBodyLeftLi2"} onClick={(e)=>{this.props.getSubItemsId.call(this,v.id,e)}}>{v.name}<span>({v.count/1})</span></li>
                        ))
                    }
                </ul>
                <CityDetailSmall></CityDetailSmall>
            </div>
        </div>
      )
    }
    componentDidMount(){
        document.querySelectorAll(".cityHead12")[0].style.color = "#F03D37";
        document.querySelectorAll(".cityHead12")[0].style.borderBottom = "1px solid #f03d37";
        this.props.getAllCity.call(this);
    }
}
function mapStateToProps(state) {
    return{
        subItems:state.cinemaReducer.subItems,
        allCityShow:state.cinemaReducer.allCityShow,
    }
}
function mapDispatchToProps(dispatch){
    return{
        getAllCity(){//获取到全城里面所有的商区和地铁
            dispatch(cinemaActionCreatore.getAllCity.call(this))
        },
        getSubItemsId(id,e){//根据左边的区，得到Id，用来得到区下面的地名
            dispatch(getSubItemsId(id))
            if(id===-1) {//如果点击的是全部，则直接刷新页面
                if(!(localStorage.districtId/1===-1 && localStorage.areaId/1===-1 && localStorage.lineId/1===-1 && localStorage.stationId/1===-1)){
                    localStorage.districtId = -1;
                    localStorage.areaId = -1;
                    localStorage.lineId = -1;
                    localStorage.stationId = -1;
                     dispatch(cinemaActionCreatore.getCinemaSmall.call(this))
                     dispatch(changeDetailName("全城"))//重新命名箭头左侧名称
                     dispatch(allCityShow());
                }
            }
            //     localStorage.districtId = -1;
            //     localStorage.areaId = -1;
            //     localStorage.lineId = -1;
            //     localStorage.stationId = -1;
            //  dispatch(cinemaActionCreatore.getCinemaSmall.call(this))
            //  dispatch(changeDetailName("全城"))//重新命名箭头左侧名称
            // }
            let cityBodyLeftLi = document.querySelectorAll(".cityBodyLeftLi2");
            cityBodyLeftLi[0].style.color = "#777777";//点击将第一个li颜色变为原来的
            for(let i=0;i<cityBodyLeftLi.length;i++){
                cityBodyLeftLi[i].style.backgroundColor = "#ffffff";
                cityBodyLeftLi[i].style.color = "#777777";
            }
            if(e.target.className === "cityBodyLeftLi2"){
                e.target.style.backgroundColor = "#F5F5F5";
                e.target.style.color = "#F03D37";
            }else{
                e.target.parentNode.style.backgroundColor = "#F5F5F5";
                e.target.parentNode.style.color = "#F03D37";
            }
        },
        getSort(typeNum){//点击商区或者地铁站，根据类型不同获取不同的数据(1为商区、2为地铁站)
            const cityHead10 =  document.querySelectorAll(".cityHead1")[0];
            const cityHead11 =  document.querySelectorAll(".cityHead1")[1];
            cityHead10.style.color = cityHead11.style.color = "#777777";
            cityHead10.style.borderBottom = cityHead11.style.borderBottom = "1px solid #e8e8e8";
            if(typeNum===1){
                cityHead10.style.color = "#F03D37";
                cityHead10.style.borderBottom = "1px solid red";
            }
            else{
                cityHead11.style.color = "#F03D37";
                cityHead11.style.borderBottom = "1px solid red";
            }
            dispatch(cinemaActionCreatore.getAllCity.call(this,typeNum))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllCity);