import React from "react";
import tools from "../filters/tools"
import action from "../store/action/search"
import "../assets/css/search/search.css"
import {
    connect
} from "react-redux"
import {
    Link
} from "react-router-dom";
class Search extends React.Component {
    constructor(){
        super();
        this.state = {
            isShow:false
        }
    }
    render() {
        return (
            <div className="search-all" >
                <div className="search-navbar-one">
                    <div className="search-nav-wrap-left-one">
                        <span className="iconfont iconfont-first icon-left" onClick={() =>
                            this.props.history.go(-1)
                        }></span>
                    </div>
                    <h1 className="search-nav-header-one">猫眼电影</h1>
                </div>
                <div className="search-body">
                    <div className="search-header">
                        <div className="search-input-wrapper">
                            <span className="iconfont search-icon icon-sousuo"></span>
                            <input className="search-input" type="text" ref="keyWord"
                                   onInput={()=>{
                                       if(this.refs.keyWord.value) {
                                           this.props.getDetail.call(this,this.refs.keyWord.value)
                                           this.setState({
                                               isShow:true
                                           })
                                       }else{
                                           this.setState({
                                               isShow:false
                                           })
                                       }
                                   }}
                                   placeholder={"搜电影、搜影院"}/>
                            <span className="iconfont search-icon-cuowu icon-cuowu1"
                                  style={{display:this.state.isShow===true?"block":"none"}}
                                  onClick={()=>{
                                this.refs.keyWord.value = ""
                                this.setState({
                                    isShow:false
                                })
                            }}></span>
                        </div>
                        <div className="search-cancel" onClick={() =>
                            this.props.history.go(-1)
                        }>取消</div>
                    </div>
                    <div className="one-two">
                        <div className="search-info">
                            {this.state.isShow===true?this.props.total?<div className="search-detail-header">电影/电视剧/综艺</div>:"":""}
                        </div>

                        <>
                            {
                                this.state.isShow === true?this.props.movies?
                                    this.props.movies.slice(0,3).map(v=>(
                                        <div className="search-detail-list" key={v.id}>
                                            <img src={tools.detailMoviesPicTwo(v.img)} alt="" className="search-img"/>
                                            <div className="search-detail-list-mid">
                                                <p className="search-name">
                                                    <span className="search-one-title">{v.nm}</span>

                                                    {/*<span className="two-title" style={{*/}
                                                    {/*display:v.wish<100000?"block":"none"*/}
                                                    {/*}}>{v.wish<100000?v.wish+"人想看":"暂无评分"}</span>*/}
                                                    <span className="search-two-title" style={{

                                                    }}>{v.sc>0?v.sc+"分":"暂无评分"}</span>
                                                </p>
                                                <div className="search-name-detail">
                                                    <div className="search-name-detail-left">
                                                        <p>{v.enm}</p>
                                                        <p>{v.cat}</p>
                                                        <p>{v.rt}</p>
                                                    </div>
                                                    <div className="name-detail-right">

                                                        {/*<span className="want-look" style={{*/}
                                                        {/*background:v.showst===2&&v.globalReleased?"#FAAF00":"#3c9fe6"*/}
                                                        {/*}}>{v.showst===2&&v.globalReleased?"想看":"购票"}</span>*/}
                                                        <span className="search-want-look" style={{
                                                            background:v.globalReleased?"#3c9fe6":"#ef4238"
                                                        }}>{v.globalReleased?"购票":"预售"}</span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )):"":""

                            }
                            {
                                this.state.isShow===true?this.props.total?<div className="search-total" onClick={()=>{this.props.history.push({pathname:"/moviesList",state:{id:1,keyWord:this.refs.keyWord.value}})}}>查看全部{this.props.total}部影视剧</div>:"":""
                            }
                        </>

                        <div style={{display:this.props.cinemas?"block":"none"}}>
                            <div className="search-info">
                                {this.state.isShow===true?this.props.all?<div className="search-detail-header">影院</div>:"":""}
                            </div>
                            <>
                                {
                                    this.state.isShow===true?
                                        this.props.cinemas?this.props.cinemas.slice(0,3).map(v=>(
                                            <Link key={v.id+1} to={{pathname:"/detailCinema",state:{id:v.id}}}  style={{textDecoration:"none"}}>
<div className="search-detail-list" key={v.id}>
                                                <div className="search-detail-list-mid">
                                                    <p className="search-name">
                                                        <span className="search-three-title">{v.nm}</span>
                                                        <span className="search-four-title">{v.sellPrice+"元起"}</span>
                                                    </p>
                                                    <div className="search-name-detail">
                                                        <div className="search-name-detail-left">
                                                            <p className="search-address">{v.addr}</p>
                                                        </div>
                                                        <div className="search-name-detail-right">
                                                            <span className="search-distance">{v.distance}</span>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        width:"80%",
                                                        fontSize:"14px",
                                                    }}>
                                                <div className="search-div">座</div>
                                                        <div className="search-div" style={{
                                                            display:v.allowRefund===1?"block":"none"
                                                        }}>{v.allowRefund===1?"退":null}</div>
                                                        <div className="search-div" style={{
                                                            display:v.endorse===1?"block":"none"}}>{v.endorse===1?"改签":null}</div>
                                                        {
                                                            v.hallType ? v.hallType.map((m, i) => (
                                                                <div className="search-div" style={{
                                                                    display: v.hallType ? "block" : "none"
                                                                }} key={i}>{m}</div>
                                                            )) : ""
                                                        }
                                                        <div className="search-first" style={{
                                                            display:v.snack===1?"block":"none"}}>{v.snack===1?"小吃":null}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </Link>
                                            
                                        )):"":""

                                }
                                {
                                    this.state.isShow===true?this.props.all?<div className="search-total" onClick={()=>{this.props.history.push({pathname:"/cinemaList",state:{id:1,keyWord:this.refs.keyWord.value}})}}>查看全部{this.props.all}家影院</div>:"":""
                                }
                            </>
                        </div>
                    </div>
                    </div>
            </div>
        )
    }
    componentDidMount(){
    }
}
function mapStateToProps(state){
    // console.log(state)
    return {
        movies:state.search.movies,
        cinemas:state.search.cinemas,
        total:state.search.total,
        all:state.search.all
    }
}
function mapDispatchToProps(dispatch){
    return {
        getDetail(keyWord) {
            dispatch(action.getDetail.call(this,keyWord))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search);