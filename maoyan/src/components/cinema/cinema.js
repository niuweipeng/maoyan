import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
import "../../assets/css/cinema/cinema.css"
import "../../assets/iconfont/iconfont.css"
import AllCity from "./AllCity"
import Brand from "./Brand"
import Character from "./Character"
import cinemaActionCreatore,{allCityShow,allBrandShow,allCharacterShow,changeCharacterColor} from "../../store/action/cinema"
import Tools from "../../filters/tools"
class Cinema extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
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
                         <Link key={v.id+1} to={{pathname:"/detailCinema",state:{id:v.id}}}  style={{textDecoration:"none"}}>
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
                         </Link>
                       ))
                    }
                    <div className={"download-tip"}></div>
                    <div className={"white-bg"}></div>
                    <input className={"addCinema"} type="button" style={{display:this.props.offset<=260?"none":"block"}} value={"已加载所有影院"} onClick={()=>{this.props.addCinema.call(this,this.props.offset,1)}}/>
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
        let _this = this;
        function getScrollTop(){
            var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
            if(document.body){
                bodyScrollTop = document.body.scrollTop;
            }
            if(document.documentElement){
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        }
        //文档的总高度
        function getScrollHeight(){
            var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
            if(document.body){
                bodyScrollHeight = document.body.scrollHeight;
            }
            if(document.documentElement){
                documentScrollHeight = document.documentElement.scrollHeight;
            }
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            return scrollHeight;
        }
        function getWindowHeight(){
            var windowHeight = 0;
            if(document.compatMode == "CSS1Compat"){
                windowHeight = document.documentElement.clientHeight;
            }else{
                windowHeight = document.body.clientHeight;
            }
            return windowHeight;
        }
        window.onscroll = function(){
            if(_this.props.offset<=260 && Math.ceil(getScrollTop() + getWindowHeight()) == getScrollHeight() && (localStorage.districtId/1===-1 && localStorage.lineId/1===-1 && localStorage.hallType/1 ===-1 && localStorage.brandId/1 ===-1 && localStorage.serviceId/1 ===-1 && localStorage.areaId/1 ===-1 && localStorage.stationId/1 === -1)){
                _this.props.addCinema.call(_this,_this.props.offset,1);
            }
        };
    }
}
function mapStateToProps(state){
    return{
        cinema:state.cinemaReducer.cinema,
        offset:state.cinemaReducer.offset,//分页数，跳过多少条
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
        },
        //点击加载更多
        addCinema(offset,type){
            dispatch(cinemaActionCreatore.getCinema.call(this,{offset:offset+20,type}))
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Cinema);