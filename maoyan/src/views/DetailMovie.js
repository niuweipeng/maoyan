import React from "react";
import "../assets/css/detailMovie/detailMovie.css";
import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.min.css'
import tools from "../filters/tools"
import detailMovieActionCreator from "../store/action/detailMovie";
import {
    connect
} from "react-redux";
import {
    bindActionCreators
} from "redux"

class DetailMovie extends React.Component{
    render(){
        return(
            <>
            <header className="navbar">
                <div className="nav-wrap-left"><i className={"iconfont icon-fanhui"}></i></div>
                <p className="nav-header">{this.props.detailMovie.nm}</p>
            </header>
            <div className="body">
                <a id="download-header" href="w">
                    <div className="download-app-bar">
                        <img alt="" className="img-noneBg-logo" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png"/>
                        <div className="app-name-desc">
                            <div className="app-name">猫眼</div>
                            <div className="app-desc">在线选座，热门影讯，爱上电影</div>
                        </div>
                        <div className="btn-open-app">立即打开</div>
                    </div>
                </a>
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
                            <div className="score-line-ellipsis">
                                {this.props.detailMovie.sc}
                                <span className="snum">{tools.people(this.props.detailMovie.snum)}</span>
                            </div>
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
            </div>
            <div className="swiper-bax">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.props.showDays.dates?
                            this.props.showDays.dates.map(v=>(
                                <div className="swiper-slide" key={v.date}>{v.date}</div>
                            )):null
                        }
                    </div>
                </div>
            </div>
            </>
        )
    }
    componentDidMount(){
        this.props.getDetailMovie(this.props.location.state.id);
        new Swiper('.swiper-container', {
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
function mapDispatchToProps(dispatch) {
    return bindActionCreators(detailMovieActionCreator,dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);