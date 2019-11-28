import React from "react";
import axios from "axios";
import tools from "../filters/tools"
import "../assets/css/search/search.css"
import {
    connect
} from "react-redux"
class Search extends React.Component {
    constructor(){
        super();
        this.state = {
            isShow:false
        }
    }
    render() {
        return (
            <>
                <div className="navbar">
                    <div className="nav-wrap-left">
                        <span className="iconfont icon-left" onClick={() =>
                            this.props.history.go(-1)
                        }></span>
                    </div>
                    <h1 className="nav-header">猫眼电影</h1>
                </div>
                <div className="search-body">
                    <div className="search-header">
                        <div className="input-wrapper">
                            <span className="iconfont search-icon icon-sousuo"></span>
                            <input className="search-input" type="text" ref="keyWord"
                                   onBlur={()=>{
                                       if(this.refs.keyWord.value) {
                                           this.props.getDetail.call(this, this.refs.keyWord.value)
                                       }else{
                                           this.setState({
                                               isShow:false
                                           })
                                       }
                                   }}
                                   placeholder={"搜电影、搜影院"}/>
                            <span className="iconfont search-icon1 icon-cuowu1" onClick={()=>{
                                this.refs.keyWord.value = ""
                                this.setState({
                                    isShow:false
                                })
                            }}></span>
                        </div>
                        <div className="cancel" onClick={() =>
                            this.props.history.go(-1)
                        }>取消</div>
                    </div>
                    <div className="search-info">
                        {this.state.isShow===true?<div className="search-detail-header">电影/电视剧/综艺</div>:""}
                    </div>
                    <div className="context">
                        {
                            console.log(this.props.kw)
                            // this.props.kw.map(v=>(
                            //     <div className="context-one">
                            //         <span className="iconfont search-icon-one icon-shijianlishijilujishizhongbiaoxianxing"></span>
                            //         <p className="context-text">{v}</p>
                            //         <span className="iconfont search-icon-two icon-cuowu"></span>
                            //     </div>
                            // ))
                        }
                    </div>

                    <>
                        {
                            this.state.isShow === true?
                                this.props.movies.slice(0,3).map(v=>(
                                    <div className="search-detail-list" key={v.id}>
                                        <img src={tools.detailMoviesPicTwo(v.img)} alt="" className="search-img"/>
                                        <div className="search-detail-list-mid">
                                            <p className="name">
                                                <span className="one-title">{v.nm}</span>

                                                {/*<span className="two-title">{v.wish>100000?v.wish+"人想看":""}</span>*/}
                                                <span className="two-title">{v.sc>0?v.sc+"分":"暂无评分"}</span>
                                            </p>
                                            <div className="name-detail">
                                                <div className="name-detail-left">
                                                    <p>{v.enm}</p>
                                                    <p>{v.cat}</p>
                                                    <p>{v.rt}</p>
                                                </div>
                                                <div className="name-detail-right">
                                                    <span className="want-look">想看</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )):""

                            }
                            {
                                this.state.isShow===true?<div className="total">查看全部{this.props.total}部影视剧</div>:""
                            }
                    </>


                </div>
            </>
        )
    }
    componentDidMount(){
        // console.log(this.props)
        if(this.refs.keyWord.value){
            this.props.getDetail()
        }


    }
}
function mapStateToProps(state){
    return {
        movies:state.search.movies,
        total:state.search.total,
        kw:localStorage.kw
    }
}
function mapDispatchToProps(dispatch){
    return {
        async getDetail(keyWord){
            const data = await axios.get("/ajax/search",{
                params:{
                    kw:keyWord,
                    cityId:150,
                    stype:-1
                }
            })
            console.log(data)
            if(data.cinemas && data.movies){
                dispatch({
                    type:"GET_DETAIL",
                    payload:{
                        movies:data.movies.list,
                        cinemas:data.cinemas.list,
                        total:data.movies.total,
                        keyWord:keyWord
                    }
                })
            } else if(data.movies){
                dispatch({
                    type:"GET_DETAIL",
                    payload:{
                        movies:data.movies.list,
                        total:data.movies.total,
                        keyWord:keyWord
                    }
                })
            }
            this.setState({
                isShow:true
            })
            if(!keyWord){
                this.setState({
                    isShow:false
                })
            }
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search);