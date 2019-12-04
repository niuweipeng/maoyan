import React from "react";
import "..//assets/css/detailCinema/detailCinema.css";
import Swiper from 'swiper/js/swiper.js';
import 'swiper/css/swiper.min.css';
import tools from "../filters/tools";
import MovieInfo from "../components/detailCinema/MovieInfo";
import DayAndTickets from "../components/detailCinema/DayAndTickets";
import detailCinemaActionCreator from "../store/action/detailCinema";
import {
    connect
} from "react-redux";
import {
    bindActionCreators
} from "redux"

class DetailCinema extends React.Component{
    constructor(){
        super();
        this.state = {
            sendInfo:{}
        }
    }
    render(){
        return(
            <>
              <header className="navbar-c">
                <div className="nav-wrap-left"><i className={"iconfont icon-fanhui"} onClick={()=>{this.props.history.go(-1)}}></i></div>
                <p className="nav-header">{this.props.cinemaData.nm}</p>
            </header>
            <div className="body">
                <a id="download-header" href="javascript:void(0);">
                    <div className="download-app-bar">
                        <img alt="" className="img-noneBg-logo" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png"/>
                        <div className="app-name-desc">
                            <div className="app-name">猫眼</div>
                            <div className="app-desc">在线选座，热门影讯，爱上电影</div>
                        </div>
                        <div className="btn-open-app">立即打开</div>
                    </div>
                </a>
                <div className="cinema-wrap">
                    <div className="title-line-ellipsis">{this.props.cinemaData.nm}</div>
                    <div className="location-line-ellipsis">{this.props.cinemaData.addr}</div>
                    <div className="location-icon">
                        <img alt="" src={tools.locationIcon()}/>
                    </div>
                </div>
                <div className="swiper-box">
                    <div className="opacityBg" 
                    style={{backgroundImage:"url("+tools.detailMoviesBgPic(this.state.sendInfo.shows?this.state.sendInfo.img:this.props.sendInfo.img)+")"}}></div>
                    <div className="swiper-container swiper1">
                        <div className="swiper-wrapper">
                        {
                            this.props.showData.movies?
                            this.props.showData.movies.map(v=>(
                                <div className="swiper-slide" key={v.id}>
                                    <img alt="" src={tools.detailMoviesPic(v.img)} style={{width: "85px",height:"120px"}} onClick={this.sendInfo.bind(this,v.id)}/>
                                </div>
                            )):null
                        }
                        </div>
                    </div>
                </div>
                <MovieInfo sendInfo={this.state.sendInfo.shows?this.state.sendInfo:this.props.sendInfo}></MovieInfo>
                <DayAndTickets sendInfo={this.state.sendInfo.shows?this.state.sendInfo:this.props.sendInfo}></DayAndTickets>
                <div className="tuan-wrap">
                    <div className="tuan-list">
                        <div className="tuan-title">影院超值套餐</div>
                        {
                            this.props.dealList.dealList?
                            this.props.dealList.dealList.map(v=>(
                                <div className="tuan-item">
                                    <img alt="" src={v.imageUrl}/>
                                    <div className="item-info">
                                        <div className="item-info-title">
                                            <span>
                                            {v.recommendPersonNum === 1?"单人":v.recommendPersonNum === 2?"双人":"多人"}
                                            </span>
                                            {v.title}
                                        </div>
                                        <div className="sell-num">{v.curNumberDesc}</div>
                                        <div className="price">
                                            <span className="sell-price">
                                                <span>¥</span>
                                                <span className="num">{v.price}</span>
                                            </span>
                                        </div>
                                        <div className="buy-btn">去购买</div>
                                    </div>   
                                </div>
                            )):null
                        }
 			<div className={"download-tip"}></div>
                   	<div className={"white-bg"}></div>
                    </div>
                </div>       
            </div>  
            </>
        )
    }
    componentDidMount(){
        this.props.getDetailMovie(this.props.location.state.id);
        new Swiper('.swiper1', {
            slidesPerView: 3,
            observer:true,
            centeredSlides: true,
            slideToClickedSlide: true,
        })
        if(this.props.showData.movies){
            this.sendInfo()
        }
        
    }
    sendInfo(id=this.props.showData.movies[0].id){
        const info = this.props.showData.movies.find(v=>v.id === id);
        this.setState({
            sendInfo:info
        })
    }
}
function mapStateToProps(state) {
    return {
        cinemaData:state.detailCinema.cinemaData,
        dealList:state.detailCinema.dealList,
        showData:state.detailCinema.showData,
        sendInfo:state.detailCinema.sendInfo
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(detailCinemaActionCreator,dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);