import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
import "../../assets/css/cinemaSmall/cinema.css"
import "../../assets/iconfont/iconfont.css"
import AllCitySmall from "./AllCitySmall"
import BrandSmall from "./BrandSmall"
import CharacterSmall from "./CharacterSmall"
import cinemaActionCreatore,{allCityShow,allBrandShow,allCharacterShow,changeCharacterColor} from "../../store/action/cinema"
import Tools from "../../filters/tools"
class CinemaSmall extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
                <div className={"cinema2"}>
                <div className={"cinemaNav2"}>
                    <ul className={"cinemaNavUl2"}>
                        <li onClick={()=>{this.props.changeAllCityShow()}} className={"cinemaNavLi2"} style={{color:this.props.allCityShow?"#E54847":"#777777"}}>
                            <span className={"cinemaNavLiName2"}>全城</span>
                            <span className={this.props.allCityShow?"iconfont icon-shangjiantou":"iconfont icon-shangjiantou1"}></span>
                        </li>
                        <li onClick={()=>{this.props.changeAllBrandShow()}} className={"cinemaNavLi2"} style={{color:this.props.allBrandShow?"#E54847":"#777777"}}>
                            <span className={"cinemaNavLiName2"}>品牌</span>
                            <span className={this.props.allBrandShow?"iconfont icon-shangjiantou":"iconfont icon-shangjiantou1"}></span>
                        </li>
                        <li onClick={()=>{this.props.changeAllCharacterShow.call(this)}} className={"cinemaNavLi2"} style={{color:this.props.allCharacterShow?"#E54847":"#777777"}}>
                            <span className={"cinemaNavLiName2"}>特色</span>
                            <span className={this.props.allCharacterShow?"iconfont icon-shangjiantou":"iconfont icon-shangjiantou1"}></span>
                        </li>
                    </ul>
                </div>
                <AllCitySmall></AllCitySmall>
                <BrandSmall></BrandSmall>
                <CharacterSmall></CharacterSmall>
                <div className={"cinemaBody2"}>
                    {
                        this.props.cinema.map(v=>(
                         <Link key={v.id+1} to={"/"+v._id} style={{textDecoration:"none"}}>
                            <div key={v.id} className={"cinemaBodyOut2"}>
                                <div className={"cinemaBodyIn2"}>
                                    <div className={"inTitleDiv2"}>
                                        <div className={"inTitle2"}>{v.nm}</div>
                                        <div className={"inMoney2"}>{v.sellPrice}
                                            <span className={"inMoney12"}>元起</span>
                                        </div>
                                    </div>
                                    <div className={"inPositionDiv2"}>
                                        <div className={"inPosition2"}>{v.addr}</div>
                                        <div className={"inDistance2"}>{Tools.filDistance(v.distance)}</div>
                                    </div>
                                    <div className={"inLabel2"}>
                                        <div className={"endorse2"} style={{
                                            display:v.tag.allowRefund?"block":"none"
                                        }}>退</div>
                                        <div className={"endorse2"} style={{
                                            display:v.tag.endorse?"block":"none"
                                        }}>改签</div>
                                        <div className={"snack2"} style={{
                                            display:v.tag.snack?"block":"none"
                                        }}>小吃</div>
                                        <div className={"vipTag2"} style={{
                                            display:v.tag.vipTag?"block":"none"
                                        }}>折扣卡</div>
                                        {
                                            v.tag.hallType?v.tag.hallType.map((m,i)=>(
                                                <div key={m+i} className={"hallType2"}>{m}</div>
                                            )):""
                                        }
                                    </div>
                                    {
                                        v.promotion.cardPromotionTag?<div className={"inCard2"}>
                                            <img className={"cardImg2"} src={Tools.cardImg("cardImg")} alt=""/>
                                            <div className={"cardIntroduction2"}>{v.promotion.cardPromotionTag}</div>
                                        </div>:null
                                    }
                                </div>
                            </div>
                         </Link>
                       ))
                    }
                    <div className={"download-tip"}></div>
                    <div className={"white-bg"}></div>
                </div>
            </div>
        )
    }
    UNSAFE_componentWillReceiveProps(){
        let cinemaNavLiName = document.querySelectorAll(".cinemaNavLiName2");
        if(this.props.detaiBrandName){
            cinemaNavLiName[1].innerText = this.props.detaiBrandName;
        } else cinemaNavLiName[1].innerText = "品牌";

        if(this.props.detaiCitylName){
            cinemaNavLiName[0].innerText = this.props.detaiCitylName;
        } else cinemaNavLiName[0].innerText = "全城";
    }
    componentDidMount(){
        // window.removeEventListener("scroll",function () {
        //     alert("assasaas")
        // },false)
        localStorage.districtId = localStorage.lineId = localStorage.hallType = localStorage.brandId = localStorage.serviceId = localStorage.areaId = localStorage.stationId = -1;//初始化本地存储
    }
}
function mapStateToProps(state) {
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
        getCinemaSmall() {
            dispatch(cinemaActionCreatore.getCinemaSmall.call(this))
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
export default connect(mapStateToProps,mapDispatchToProps)(CinemaSmall);