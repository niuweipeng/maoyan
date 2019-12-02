import React from "react"
import "../assets/css/moviesList/moviesList.css"
import tools from "../filters/tools"
import action from "../store/action/moviesList"
import {
    connect
} from "react-redux"
import moviesList from "../store/reducer/moviesList";

class MoviesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scrollHeight: 0
        }
    }
    render() {
        return (
            <div className="moviesList-all">
                <div className="movies-bar" ref={"header"}>
                    <div className="movies-wrap-left">
                        <span className="iconfont icon-left" onClick={() =>
                            this.props.history.go(-1)
                        }></span>
                    </div>
                    <h1 className="movies-nav-header">猫眼电影</h1>
                </div>
                <div className="positionHeight" ref={"positionHeight"}>
                    <ul className="position-list">
                        {

                            this.props.movies ? this.props.movies.map((v, i) => (
                                <li className="position-detail-list" key={i}>
                                    <img src={tools.detailMoviesPicTwo(v.img)} alt="" className="position-img"/>
                                    <div className="position-detail-list-mid">
                                        <p className="name">
                                            <span className="one-title">{v.nm}</span>
                                            <span className="two-title" style={{
                                                color: v.sc > 0 ? "#ffaa00" : "#666666",
                                                fontSize: v.sc > 0 ? "16px" : "14px"
                                            }}>{v.sc > 0 ? v.sc + "分" : "暂无评分"}</span>
                                        </p>
                                        <div className="name-detail">
                                            <div className="name-detail-left">
                                                <p>{v.enm}</p>
                                                <p>{v.cat}</p>
                                                <p>{v.rt}</p>
                                            </div>
                                            <div className="name-detail-right">
                                            <span className="want-look" style={{
                                                background: v.globalReleased ? "#3c9fe6" : "#ef4238"
                                            }}>{v.globalReleased ? "购票" : "预售"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )) : ""
                        }
                    </ul>
                </div>
            </div>
        )
    }

    componentDidMount() {

        const {id, keyWord} = this.props.location.state;
        let offset = this.props.offset;
        this.props.getAllMovies.call(this, id, keyWord, offset);




        // const _this = this
        // // console.log(this.props.count)
        // window.onscroll=function(){
        //     let t = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
        //     console.log(t)
        //     // console.log(t)
        //     // console.log(_this.refs.positionHeight.offsetHeight)
        //     let height = _this.refs.positionHeight.offsetHeight
        //     // for(let i=1;i<_this.props.count-1;i++) {
        //     //     //     setTimeout(()=>{
        //     //             if(t>height*i){
        //     //                 let newOffset = offset + 20
        //     //                 _this.props.getAllMovies.call(_this, id, keyWord, newOffset)
        //     //             }
        //     //     //     },1000)
        //     }
        // }

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
;