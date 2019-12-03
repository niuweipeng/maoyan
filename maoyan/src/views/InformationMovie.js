import React from "react";
import tools from "../filters/tools";
import "../assets/css/informationMovie/informationMovie.css";
import informationMovieAction from "../store/action/informationMovie";
import {
    connect
} from "react-redux";
import {
    bindActionCreators,
} from "redux";

class InformationMovie extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        return(
            <div className="movie-page">
                <a id="download-header" href="javascript:void(0);">
                    <div className="download-app-bar">
                        <img className="img-noneBg-logo" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png"/>
                        <div className="app-name-desc">
                            <div className="app-name">猫眼</div>
                            <div className="app-desc">在线选座，热门影讯，爱上电影</div>
                        </div>
                        <div className="btn-open-app">立即打开</div>
                    </div>
                </a>
                <div className="movie-info" style={{background:this.props.detailMovie.backgroundColor}}>
                    <div className="movie-info-top">
                        <div className="movie-cover">
                            <a href="javascript:void(0);">
                                <img className="img-noneBg-poster" alt="" src={tools.detailMoviesPic(this.props.detailMovie.img)} style={{width:"100px",height:"138px"}}/>
                                <img className="img-noneBg-poster-play" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/poster-play.png"  onClick={()=>{this.props.history.push("/preview")}}/>
                            </a>
                        </div>
                        <div className="movie-desc">
                            <div className="movie-desc-top">
                                <div className="movie-cn-name">{this.props.detailMovie.nm}</div>
                                <div className="movie-en-name">{this.props.detailMovie.enm}</div>
                                <div className="movie-other-info">
                                    <div className="movie-type">
                                        <span className="movie-cat">{this.props.detailMovie.cat}</span>
                                        <span className="movie-tag" style={{display:this.props.detailMovie.egg?"inline-block":"none"}}>
                                            <img className="img-noneBg-3dmax" alt="" src={tools.IMAX3D()}/>
                                        </span>
                                    </div>
                                    <div className="actors">{(this.props.detailMovie.star).replace(/,/g,"/")}</div>
                                    <div className="movie-show-time">
                                        <span>{this.props.detailMovie.pubDesc} / {this.props.detailMovie.dur}分钟</span>
                                        <img className="img-noneBg-youjiantou" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/arrow-right.png"/>
                                    </div>
                                </div>
                            </div>
                            <div className="btns">
                                <button className="button-want-to-watch">
                                    <img className="img-noneBg-xiangkan" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/want-to-watch.png"/>
                                    <span>想看</span>
                                </button>
                                <a href="javascript:void(0);" className="link-button-btn-right-watched" >
                                    <img className="img-noneBg-kanguo" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/star.png"/>
                                    <span>看过</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="real-time-word-of-mouth">
                        <div className="top">
                            <div className="left">
                                <img className="img-noneBg-loglog" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/logo.png"/>
                                <span>实时口碑</span>
                            </div>
                            <div className="right">
                                <span className="num">{this.props.wish}</span>
                                <span>人想看</span>
                                <span className="num-watched">{this.props.watched}</span>
                                <span>人看过</span>
                            </div>
                        </div>
                        <div className="middle">
                            {this.props.detailMovie.sc/1 > 0?
                                <div className="left">
                                    <span className="score">{this.props.detailMovie.sc}</span>
                                    <span className="people-grade">
                                        <span>{this.props.snum}</span>
                                        <span>人评</span>
                                    </span>
                                </div>:
                            <div className="left-two">
                                <span className="score">{this.props.wish}</span>
                                <span>人想看</span>
                            </div>
                            }
                            <div className="right">
                                {/* 找到数据再写吧 */}
                            </div>
                        </div>
                        <div className="separator-line"></div>
                        {/* <div className="bottom">
                            <div className="left">
                                <span>同期动画片中评分第一</span>
                            </div>
                        </div> */}
                    </div>
                    <div className="activity-bar">
                        <a href="javascript:void(0);" className="link-btn-open-app" link="w">
                        <div className="left">
                            <img className="img-noneBg-juzi" alt="" src="//p1.meituan.net/moviemachine/18acdfb0ecb99eb5250512446d7e87fe2282.png"/>
                            <span>0 元看电影，速抢 👉</span>
                        </div>
                        <div className="right">
                            <span>前往 App，免费领取</span>
                            <img className="img-noneBg-gyjiantou" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/arrow-right.png"/>
                            </div>
                        </a>
                    </div>
                    <div className="separator-line"></div>
                    <div className="movie-watching-tips">
                        <div className="tip">
                            <div className="icon">
                                <img className="img-noneBg-egg" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/tip-icon-surprise.png"/>
                            </div>
                            <span>有1个彩蛋，在片尾出现</span>
                        </div>
                    </div>
                    <div className="separator-line"></div>
                    <div className="brief-introduction">
                        <div className="title">
                            <span>简介</span>
                            <div>
                                <button type="button" className="open" onClick={()=>{console.log(this.refs.lienClamp.id = "")}}>
                                    <span>展开</span>
                                    <img className="img-noneBg-xiajian" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/arrow-right.png"/>
                                </button>
                            </div>
                        </div>
                        <div className="content ">
                            <p id="brief-introduction-content" className="line-clamp" ref={"lienClamp"}>{this.props.detailMovie.dra}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        setInterval(() => {
            this.props.getNum(this.props.detailMovie.id)
        }, 2000);
    }
}
function mapStateToProps(state) {
    return {
        detailMovie:state.detailMovie.detailMovie,
        snum:state.informationMovie.snum,
        watched:state.informationMovie.watched,
        wish:state.informationMovie.wish,
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(informationMovieAction,dispatch)
}   
export default connect(mapStateToProps, mapDispatchToProps)(InformationMovie);