import React from "react"
import action from "../store/action";
import {connect} from "react-redux";
import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.min.css'
import  Tools from  "../filters/tools"
import  {
    Link
} from "react-router-dom"
class Willplay extends  React.Component {
    render() {
        return (
            <div className={"most-expected"}>
                <p className={"want"}>近期最受期待</p>
                <div className={"most-expected-list"}>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                                this.props.wantlookList.map(v=>(
                                <div className="swiper-slide" key={v.id}>
                                    <div className={"wantshow"}>
                                        <div className={"expected-item"}>
                                            <div className={"poster default-img-bg"}>
                                                <img src={Tools.wanntlookMoviesPic(v.img)} alt={""}/>
                                                <div className={"wish"}>
                                                    <span className={"wish-num"}>{v.wish} 人想看</span>
                                                </div>
                                            </div>
                                            <h5 className={"name line-ellipsis"}>{v.nm}</h5>
                                            <p className={"date"}>{v.comingTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>



                <div style={{marginLeft:"-16px"}}>
                    {
                        this.props.willplaymoviesList.map((v)=>(

                            <Link to={"/detail"} key={v.id} className={"nounderline"}>

                                <div className="list-wrap" >
                                    <div className="item" >
                                        <div className="main-block">
                                            <div>{v.comingTitle}</div>
                                            <div className="avatar" sort-flag="">
                                                <div className="default-img-bg">
                                                    <img src={Tools.detailMoviesPictwo(v.img)} alt={""}/>
                                                </div>
                                            </div>
                                            <div className="mb-outline-b content-wrapper">
                                                <div className="column content">
                                                    <div className="box-flex movie-title">
                                                        <div className="title line-ellipsis v3dimax_title">{v.nm}</div>
                                                        <span className="version v3d imax"></span>
                                                    </div>
                                                    <div className="detail column">
                                                        <div className="score line-ellipsis">
                                                            <span className="score-suffix">{v.sc?"观众评":""} </span>
                                                            <span className="grade">{v.sc?v.sc.toFixed(1):v.wish+"人想看"}</span>
                                                        </div>
                                                        <div className="actor line-ellipsis">主演: {v.star}</div>
                                                        <div className="show-info line-ellipsis">{v.showInfo}</div>

                                                    </div>
                                                </div>
                                                <div className="button-block">
                                                    <div className="btn normal" style={{background:v.showst===4?"#3c9fe6":"#faaf00"}}><span className="fix" >{v.showst===4?"预售":"想看"}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>





            </div>
        )
    }

    componentDidMount(){
        this.props.getWillwantmovie.call(this)
        this.props.getWillplay.call(this)
        new Swiper('.swiper-container', {
            slidesPerView: 3.9,
            spaceBetween: 30,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
}
function  mapStateToProps(state) {
    return {
        wantlookList:state.movies.wantlookList,
        willplaymoviesList:state.movies.willplaymoviesList
    }
}
function  mapDispatchToProps(dispatch) {
return {
    getWillwantmovie(){
        dispatch(action.getWillwantmovie.call(this))
    },
    getWillplay(){
        dispatch(action.getWillwantmovielist.call(this))
    }
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Willplay)


