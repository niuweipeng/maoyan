import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
import "../assets/css/cinema/cinema.css"
import "../assets/iconfont/iconfont.css"
import AllCity from "../components/cinema/AllCity"
import Brand from "../components/cinema/Brand"
import Character from "../components/cinema/Character"
import cinemaActionCreatore,{changeCharacterColor} from "../store/action/cinema"
import {allCityShow} from "../store/action/cinema"
import {allBrandShow} from "../store/action/cinema"
import {allCharacterShow} from "../store/action/cinema"
import Tools from "../filters/tools"
class Cinema extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <div style={{
                    height:"94px"
                }}>saaaaaaaaaaaaaa</div>

            <div className={"cinema"}>
                <div className={"cinemaNav"}>
                    <ul className={"cinemaNavUl"}>
                        <li onClick={()=>{this.props.changeAllCityShow()}} className={"cinemaNavLi"} style={{color:this.props.allCityShow?"#E54847":"#777777"}}>
                            <span className={"cinemaNavLiName"}>全城</span>
                            <span className={this.props.allCityShow?"iconfont icon-shangjiantou":"iconfont icon-shangjiantou1"}></span>
                        </li>
                        <li onClick={()=>{this.props.changeAllBrandShow()}} className={"cinemaNavLi"} style={{color:this.props.allBrandShow?"#E54847":"#777777"}}>
                            <span className={"cinemaNavLiName"}>品牌</span>
                            <span className={this.props.allBrandShow?"iconfont icon-shangjiantou":"iconfont icon-shangjiantou1"}></span>
                        </li>
                        <li onClick={()=>{this.props.changeAllCharacterShow.call(this)}} className={"cinemaNavLi"} style={{color:this.props.allCharacterShow?"#E54847":"#777777"}}>
                            <span className={"cinemaNavLiName"}>特色</span>
                            <span className={this.props.allCharacterShow?"iconfont icon-shangjiantou":"iconfont icon-shangjiantou1"}></span>
                        </li>
                    </ul>
                </div>
                <AllCity></AllCity>
                <Brand></Brand>
                <Character></Character>
                <div className={"cinemaBody"}>
                    {
                        this.props.cinema.map(v=>(
                            <div key={v.id} className={"cinemaBodyOut"}>
                                <div className={"cinemaBodyIn"}>
                                    <div className={"inTitleDiv"}>
                                        <div className={"inTitle"}>{v.nm}</div>
                                        <div className={"inMoney"}>{v.sellPrice}
                                            <span className={"inMoney1"}>元起</span>
                                        </div>
                                    </div>
                                    <div className={"inPositionDiv"}>
                                        <div className={"inPosition"}>{v.addr}</div>
                                        <div className={"inDistance"}>{Tools.filDistance(v.distance)}</div>
                                    </div>
                                    <div className={"inLabel"}>
                                        <div className={"endorse"} style={{
                                            display:v.tag.allowRefund?"block":"none"
                                        }}>退</div>
                                        <div className={"endorse"} style={{
                                           display:v.tag.endorse?"block":"none"
                                        }}>改签</div>
                                        <div className={"snack"} style={{
                                            display:v.tag.snack?"block":"none"
                                        }}>小吃</div>
                                        <div className={"vipTag"} style={{
                                            display:v.tag.vipTag?"block":"none"
                                        }}>折扣卡</div>
                                        {
                                         v.tag.hallType?v.tag.hallType.map((m,i)=>(
                                             <div key={m+i} className={"hallType"}>{m}</div>
                                            )):""
                                        }
                                    </div>
                                    {
                                        v.promotion.cardPromotionTag?<div className={"inCard"}>
                                            <img className={"cardImg"} src={Tools.cardImg("cardImg")} alt=""/>
                                            <div className={"cardIntroduction"}>{v.promotion.cardPromotionTag}</div>
                                        </div>:null
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            </div>
        )
    }
    UNSAFE_componentWillReceiveProps(){
         let cinemaNavLiName = document.querySelectorAll(".cinemaNavLiName");
        if(this.props.detaiBrandName){
            cinemaNavLiName[1].innerText = this.props.detaiBrandName;
        } else cinemaNavLiName[1].innerText = "品牌";

       if(this.props.detaiCitylName){
           cinemaNavLiName[0].innerText = this.props.detaiCitylName;
       } else cinemaNavLiName[0].innerText = "全城";
    }
    componentDidMount(){
        localStorage.districtId = localStorage.lineId = localStorage.hallType = localStorage.brandId = localStorage.serviceId = localStorage.areaId = localStorage.stationId = -1;//初始化本地存储
     this.props.getCinema.call(this);
    }
}
function mapStateToProps(state) {
    console.log(typeof state.cinemaReducer.characterColor,"jljkdsjkdsjksdk");
    return{
        cinema:state.cinemaReducer.cinema,
        allCityShow:state.cinemaReducer.allCityShow,
        allBrandShow:state.cinemaReducer.allBrandShow,
        allCharacterShow:state.cinemaReducer.allCharacterShow,
        detaiCitylName:state.cinemaReducer.detaiCitylName,//箭头左侧的文字显示
        detaiBrandName:state.cinemaReducer.detaiBrandName,//牌影院名称
        characterColor:state.cinemaReducer.characterColor//标题特色名称的颜色
    }
}
function mapDispatchToProps(dispatch) {
    return {
        //获取所有的影院列表
        getCinema() {
            dispatch(cinemaActionCreatore.getCinema.call(this))
        },
        //修改全城组件是否显示显示的组件
        changeAllCityShow() {
            dispatch(allCityShow());
        },
        //修改品牌组件是否显示显示的组件
        changeAllBrandShow() {
            dispatch(allBrandShow());
        },
        //修改特色组件是否显示显示的组件
        changeAllCharacterShow() {
            dispatch(allCharacterShow());
        },
        //改变标题特色名称的颜色
        changeCharacterColor(status){
            dispatch(allCharacterShow(status));
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Cinema);