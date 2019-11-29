import  React from "react"
import  {
    connect
} from "react-redux"
import {
    Link
} from "react-router-dom"
import  action from "../store/action"
import  Tools from  "../filters/tools"
class  Nowplay extends  React.Component{
    render(){
        return (
            <div className={"nnnnnnn"}>
                {
                    this.props.movieList.map(v=>(
                        <Link to={"/detail"} key={v.id} className={"nounderline"}>
                            <div className="list-wrap" >
                                <div className="item" >
                                    <div className="main-block">
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
                                                <div className="btn normal" style={{background:v.globalReleased?"#f03d37":"#3c9fe6"}}><span className="fix" >{v.globalReleased?"购票":"预售"}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        ))
                }

                {/*{*/}
                    {/*Tools.changeArr(this.props.movieIds,12).map(v=>(*/}
                        {/*<p key={v}>{v}</p>*/}
                    {/*))*/}
                {/*}*/}
            </div>
        )
    }
    componentDidMount(){
        this.props.getdata.call(this)

    }
}

function mapStateToProps(state) {
    return {
        movieList:state.movies.movieList,
        movieIds:state.movies.movieIds
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getdata(){
            dispatch(action.getmoviesList.call(this))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Nowplay)