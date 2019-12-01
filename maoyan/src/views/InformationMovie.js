import React from "react";
import "../assets/css/informationMovie/informationMovie.css";
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
                <a id="download-header" href="w">
                    <div className="download-app-bar">
                        <img className="img-noneBg-logo" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png"/>
                        <div className="app-name-desc">
                            <div className="app-name">猫眼</div>
                            <div className="app-desc">在线选座，热门影讯，爱上电影</div>
                        </div>
                        <div className="btn-open-app">立即打开</div>
                    </div>
                </a>
                <div className="movie-info">
                    <div className="movie-info-top">
                        <div className="movie-cover">
                            <a href="w">
                                <img className="img-noneBg-poster" alt="电影封面图" src="//p1.meituan.net/moviemachine/58ee13be6dc60bf5e636cf915bbbaaa55787785.jpg@300w_414h" style={{width:"100px",height:"138px"}}/>
                                <img className="img-noneBg-poster-play" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/poster-play.png"/>
                            </a>
                        </div>
                        <div className="movie-desc">
                            <div className="movie-desc-top">
                                <div className="movie-cn-name">冰雪奇缘2</div>
                                <div className="movie-en-name">Frozen II</div>
                                <div className="movie-other-info">
                                    <div className="movie-type">
                                        <span className="movie-cat">喜剧 / 动画 / 冒险</span>
                                        <span className="movie-tag">
                                            <img className="img-noneBg-3dmax" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/movie-tag-3DIMAX.png"/>
                                        </span>
                                    </div>
                                    <div className="actors">克里斯汀·贝尔 / 伊迪娜·门泽尔 / 乔纳森·格罗夫</div>
                                    <div className="movie-show-time">
                                        <span>2019-11-22大陆上映 / 104分钟</span>
                                        <img className="img-noneBg-youjiantou" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/arrow-right.png"/>
                                    </div>
                                </div>
                            </div>
                            <div className="btns">
                                <button className="button-want-to-watch">
                                    <img className="img-noneBg-xiangkan" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/want-to-watch.png"/>
                                    <span>想看</span>
                                </button>
                                <a href="w" className="link-button-btn-right-watched" >
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
                                <span className="num">204361</span>
                                <span>人想看</span>
                                <span className="num-watched">167128</span>
                                <span>人看过</span>
                            </div>
                        </div>
                        <div className="middle">
                            <div className="left">
                                <span className="score">8.9</span>
                                <span className="people-grade">
                                    <span>179125</span>
                                    <span>人评</span>
                                </span>
                            </div>
                            <div className="right">
                                {/* 找到数据再写吧 */}
                            </div>
                        </div>
                        <div className="separator-line"></div>
                        <div className="bottom">
                            <div className="left">
                                <span>同期动画片中评分第一</span>
                            </div>
                        </div>
                    </div>
                    <div className="activity-bar">
                        <a href="" className="link-btn-open-app" link="w">
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
                                <img class="img-noneBg-egg" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/tip-icon-surprise.png"/>
                            </div>
                            <span>有1个彩蛋，在片尾出现</span>
                        </div>
                    </div>
                    <div className="separator-line"></div>
                    <div className="brief-introduction">
                        <div className="title">
                            <span>简介</span>
                            <div>
                                <button type="button" className="open">
                                    <span>展开</span>
                                    <img className="img-noneBg-xiajian" alt="" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/movie/arrow-right.png"/>
                                </button>
                            </div>
                        </div>
                        <div className="content ">
                            <p id="brief-introduction-content" className="line-clamp">为什么艾莎（伊迪娜·门泽尔 配音）天生就拥有神奇魔法？谜题的答案一直呼唤着她，也威胁着王国的安全。她将和安娜（克里斯汀·贝尔 配音）、克斯托夫（乔纳森·格罗夫 配音）、雪宝（乔什·盖德 配音）和驯鹿斯特共同开启一场非凡的冒险旅程。艾莎曾担心世界不能接受自己的冰雪魔法，但在《冰雪奇缘2》中她却必须祈祷自己的魔法足够强大，能够拯救世界。本片由奥斯卡金牌团队打造——导演珍妮弗·李和克里斯·巴克、制作人彼得·戴尔·维克以及词曲作者克里斯汀·安德森-洛佩兹及罗伯特·洛佩兹悉数回归，原配音班底伊迪娜·门泽尔、克里斯汀·贝尔、乔纳森·格罗夫和乔什·盖德再度加盟。华特迪士尼动画工作室荣誉出品《冰雪奇缘2》将于2019年11月22日登陆北美院线。</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default InformationMovie;