import React from "react";
import "../assets/css/detailMovie/detailMovie.css";
import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.min.css'
import tools from "../filters/tools"
import CinemaSmall from "../components/cinemaSmall/cinemaSmall"
import detailMovieActionCreator from "../store/action/detailMovie";
import cinemaActionCreatore from "../store/action/cinema"
import {
    connect,
} from "react-redux";
import {
    bindActionCreators
} from "redux";
import {
    Link
} from "react-router-dom";

class DetailMovie extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        return(
            <>
            <header className="navbar-c">
                <div className="nav-wrap-left"><i className={"iconfont icon-fanhui"} onClick={()=>{this.props.history.go(-1)}}></i></div>
                <p className="nav-header">{this.props.detailMovie.nm}</p>
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
                <Link to={{pathname:"/informationMovie",state:{id:this.props.detailMovie}}}>
                <div className="movie-detail">
                    <div className="movie-filter"></div>
                    <div className="poster-bg" style={{backgroundImage:"url("+tools.detailMoviesBgPic(this.props.detailMovie.img)+")"}}></div>
                    <div className="detail-box-flex">
                        <div className="poster">
                            <img alt="" src={tools.detailMoviesPic(this.props.detailMovie.img)}/>
                        </div>
                        <div className="content-flex">
                            <div className="content-title">{this.props.detailMovie.nm}</div>
                            <div className="title-en-name">{this.props.detailMovie.enm}</div>
                            {
                                this.props.detailMovie.sc>0?
                                <div className="score-line-ellipsis">
                                    {this.props.detailMovie.sc}
                                    <span className="snum">{tools.people(this.props.detailMovie.snum)}</span>
                                </div>:
                                <div className="score-line-ellipsis">
                                    {this.props.detailMovie.wish}想看
                                </div>
                            }
                            <div className="type-line-ellipsis">
                                <span>{this.props.detailMovie.cat}</span>
                                <div className="type-group" style={{display:this.props.detailMovie.egg?"inline-block":"none"}}>
                                    <img alt="" className="sd-imax" style={{width: "42px"}}  src={tools.IMAX3D()}/>
                                </div>
                                <div className="src-line-ellipsis">
                                    {this.props.detailMovie.fra}/{this.props.detailMovie.dur}分钟
                                </div>
                                <div className="pubDesc-line-ellipsis">{this.props.detailMovie.pubDesc}</div>
                            </div>
                        </div>
                    </div>
                    <div className="arrow-g">
                        <i className={"iconfont icon-icon1"}></i>
                    </div>
                </div>
                </Link>
            </div>
            <div className="swiper-bax">
                <div className="swiper-container swiper2">
                    <div className="swiper-wrapper">
                        {
                            this.props.showDays.dates?
                            this.props.showDays.dates.map(v=>(
                                <div className="swiper-slide" key={v.date} 
                                onClick={()=>{localStorage.dayDay = v.date;this.props.getCinemaSmall.call(this,{day:v.date,movieId:this.props.detailMovie.id})
                                }}
                                >{v.date}</div>
                            )):null
                        }
                    </div>
                </div>
            </div>
            <CinemaSmall></CinemaSmall>            
            </>
        )
    }
    componentDidMount(){
        localStorage.movieId = this.props.location.state.id;
        this.props.getDetailMovie(this.props.location.state.id);
        this.props.getCinemaSmall.call(this,{day:this.props.showDays.date,movieId:this.props.detailMovie.id})
        new Swiper('.swiper2', {
            slidesPerView: 3,
            observer:true,
            centeredSlides: true,
            slideToClickedSlide: true,
          });
    }
}
function mapStateToProps(state) {
    return {
        detailMovie:state.detailMovie.detailMovie,
        showDays:state.detailMovie.showDays,
    }
}
function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(detailMovieActionCreator,dispatch),
        ...bindActionCreators(cinemaActionCreatore,dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);