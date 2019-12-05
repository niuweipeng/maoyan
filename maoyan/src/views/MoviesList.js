import React from "react"
import "../assets/css/moviesList/moviesList.css"
import tools from "../filters/tools"
import action from "../store/action/moviesList"
import {
    connect
} from "react-redux"
import moviesList from "../store/reducer/moviesList";

class MoviesList extends React.Component {
    render() {
        return (
            <div className="moviesList-all">
                <div className="movies-bar">
                    <div className="movies-wrap-left">
                        <span className="iconfont movies-iconfont icon-left" onClick={() =>
                            this.props.history.go(-1)
                        }></span>
                    </div>
                    <h1 className="movies-nav-header">猫眼电影</h1>
                </div>
                <div className="movies-positionHeight">
                    <ul className="movies-position-list">
                        {

                            this.props.movies ? this.props.movies.map((v, i) => (
                                <li className="movies-position-detail-list" key={i}>
                                    <img src={tools.detailMoviesPicTwo(v.img)} alt="" className="movies-position-img"/>
                                    <div className="movies-position-detail-list-mid">
                                        <p className="movies-name">
                                            <span className="movies-one-title">{v.nm}</span>
                                            <span className="movies-two-title" style={{
                                                color: v.sc > 0 ? "#ffaa00" : "#666666",
                                                fontSize: v.sc > 0 ? "16px" : "14px"
                                            }}>{v.sc > 0 ? v.sc + "分" : "暂无评分"}</span>
                                        </p>
                                        <div className="movies-name-detail">
                                            <div className="movies-name-detail-left">
                                                <p style={{"marginBottom":"5px"}}>{v.enm}</p>
                                                <p style={{"marginBottom":"5px"}}>{v.cat}</p>
                                                <p style={{"marginBottom":"5px"}}>{v.rt}</p>
                                            </div>
                                            <div className="movies-name-detail-right">
                                            <span className="movies-want-look" style={{
                                                background: v.globalReleased ? "#3c9fe6" : "#ef4238"
                                            }}>{v.globalReleased ? "购票" : "预售"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )) : ""
                        }
                    </ul>
                    <div className={"download-tip"}></div>
                    <div className={"white-bg"}></div>
                </div>
            </div>
        )
    }

    componentDidMount() {

        const {id, keyWord} = this.props.location.state;
        let offset = this.props.offset;
        this.props.getAllMovies.call(this, id, keyWord, offset);


        const _this = this
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
            let newOffSet = offset + 20;
            if(Math.floor(getScrollTop() + getWindowHeight()) == getScrollHeight()){
                _this.props.getNextMovies.call(_this, id, keyWord, newOffSet)
            };

        }
    }
}

function mapStateToProps(state) {
    return {
        offset: state.moviesList.offset,
        movies: state.moviesList.moviesList,
        total: state.moviesList.total,
        count: state.moviesList.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllMovies(id, keyWord, offset) {
            dispatch(action.getAllMovies.call(this, id, keyWord, offset))
        },
        getNextMovies(id, keyWord, offset) {
            dispatch(action.getNextMovies.call(this, id, keyWord, offset))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
;