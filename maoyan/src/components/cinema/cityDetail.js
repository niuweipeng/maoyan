import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
import "../../assets/iconfont/iconfont.css"
import "../../assets/css/cinema/allCity.css"
import cinemaActionCreatore from "../../store/action/cinema"
import {allCityShow} from "../../store/action/cinema"
import {changeDetailName} from "../../store/action/cinema"
import Tools from "../../filters/tools";
class cityDetail extends React.Component{
    render(){
        return (
            <ul className={"cityBodyRight"}>
                  {
                this.props.cityDetail?this.props.cityDetail.map(k=>(
                    <li key={k.id} className={"cityRightLI"} onClick={()=>{this.props.getMovieById.call(this,k.id,k.name)}}>
                        <div className={"LILeft"}>
                            <img style={{
                                opacity:k.id===-1?"1":"0"
                            }} className={"duiHao"} src={Tools.fiImg("imgPath")} alt=""/>
                            <span className={"LILeftRight"}>{k.name}</span>
                        </div>
                        <div className={"LIRight"}>{k.count/1}</div>
                    </li>
                )):null
                  }
            </ul>
      )
    }
}
function mapStateToProps(state) {
    return{
        subItems:state.cinemaReducer.subItems,
        subItemsId:state.cinemaReducer.subItemsId,
        cityDetail:state.cinemaReducer.subItems.find(v=>v.id===state.cinemaReducer.subItemsId)?state.cinemaReducer.subItems.find(v=>v.id===state.cinemaReducer.subItemsId).subItems:"",
        typeNum:state.cinemaReducer.typeNum,//标志点击的是南区(1)还是地铁站(2)
    }
}
function mapDispatchToProps(dispatch) {
    return{
        //调用方法，传递区id和县id和镇名或地铁站名(用于改变箭头名称显示)，获取数据
        getMovieById(Id,detaiCitylName){
            dispatch(allCityShow());//调用方法，关闭下拉组件
            dispatch(changeDetailName(detaiCitylName))//调用方法，改变箭头的文字提示
            if(this.props.typeNum === 1){
                localStorage.districtId = this.props.subItemsId;
                localStorage.areaId = Id
                localStorage.lineId = -1;
                localStorage.stationId = -1;
                localStorage.brandId = -1;
                dispatch(cinemaActionCreatore.getCinema.call(this,
                    {
                        districtId:this.props.subItemsId,
                        areaId:Id
                    }))
            } else{
                localStorage.districtId = -1;
                localStorage.areaId = -1;
                localStorage.lineId = this.props.subItemsId;
                localStorage.stationId = Id;
                localStorage.brandId = -1;
                dispatch(cinemaActionCreatore.getCinema.call(this,
                    {
                        lineId:this.props.subItemsId,
                        stationId:Id
                    }))
            }

        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(cityDetail);