import React from "react";
import tools from "../filters/tools";
import "../assets/css/preview/preview.css";
import {
    connect
} from "react-redux";

class Preview extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        return(
            <>
            <div className="video-player">
                <div className="videoplayer">
                    <video src={this.props.detailMovie.vd} controls>
                    </video>
                </div>
            </div>
            <section class="preview-play">
                <a href="javascript:void(0);" class="link-download-btn">
                    <img src="//p1.meituan.net/moviemachine/0058321d6107a1b888f1512b24026ccd1354.png" alt=""/>
                    <span>打开App，提升3倍流畅度</span>
                </a>
                <div className="preview-intro">
                    <div className="preview-buy-box">
                        <div className="preview-buy-btn">
                            <a href="javascript:void(0);" className="link-btn-btn-buy">
                                <span>特惠购票</span>
                            </a>
                        </div>
                        {
                            this.props.detailMovie.sc>0?
                            <span className="preview-movie-intro-score">
                                <span>猫眼评分</span>
                                <span id="preview-movie-score">{this.props.detailMovie.sc}</span>
                            </span>:
                            <span className="preview-movie-intro-score">
                                <span id="preview-movie-score">{tools.peoplesss(this.props.detailMovie.wish)}</span>
                                <span>万人想看</span>
                            </span>
                        }
                        
                    </div>
                    <img className="img-noneBg-movie-img" src={tools.detailMoviesPic(this.props.detailMovie.img)}/>
                    <div className="movie-intro-desc">
                        <span className="movie-name">{this.props.detailMovie.nm}</span>
                        <span className="movie-ename">{this.props.detailMovie.enm}</span>
                        <span className="preview-movie-pubdesc">{this.props.detailMovie.pubDesc}</span>
                        <span className="movie-cat">{(this.props.detailMovie.cat).replace(/,/g,"/")}</span>
                        <span className="movie-star">{(this.props.detailMovie.star).replace(/,/g,"/")}</span>
                    </div>
                </div>
            </section>
            </>
        )
    }
}
function mapStateToProps(state) {
    return {
        detailMovie:state.detailMovie.detailMovie,
    }
}
function mapDispatchToProps(dispatch){

}   
export default connect(mapStateToProps, mapDispatchToProps)(Preview);