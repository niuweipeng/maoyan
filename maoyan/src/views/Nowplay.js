import  React from "react"
import  {
    connect
} from "react-redux"
import {
    Link
} from "react-router-dom"
import  action from "../store/action/movies/index"
import  Tools from  "../filters/tools"
class  Nowplay extends  React.Component{
    render(){
        return (
            <div className={"nnnnnnn"}>
                {
                    this.props.movieList.map((v,i)=>(
                        <Link to={{pathname:"/detailMovie",state:{id:v.id}}} key={i} className={"nounderline"}>
                            <div className="list-wrap" >
                                <div className="item" >
                                    <div className="main-block">
                                        <div className="avatar" sort-flag="">

                                            <div className="default-img-bg">
                                                <img src={Tools.detailMoviesPictwo(v.img)} alt={""} style={{width: "100%",margintop: "0px"}}/>
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
                <div>
                    <a  className={"download-tip"} href={"#"}></a>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.props.getdata.call(this)

        function addEvent(obj,type,fn){
            if(obj.attachEvent){ //ie
                obj.attachEvent('on'+type,function(){
                    fn.call(obj);
                })
            }else{
                obj.addEventListener(type,fn,false);
            }
        }
        const that=this
        addEvent(window,'scroll',function(){
                const  arrlength= Tools.changeArr(that.props.movieIds,13).length
                // console.log(arrlength)
                const movieIds1=(Tools.changeArr(that.props.movieIds,13)[1]).join(",")
            //    console.log(movieIds1)
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // console.log(scrollTop)
                if(scrollTop==921){
                    // setTimeout(()=>{
                        that.props.getMoredata.call(that,movieIds1)
                    // },1000)
                }
                for(let i=2;i<arrlength;i++){
                    const movieIds3=(Tools.changeArr(that.props.movieIds,13)[i]).join(",")
                    if(scrollTop>2287+(i-2)*1368&&scrollTop<2288+(i-2)*1368+1){
                        // setTimeout(()=>{
                        that.props.getMoredata.call(that,movieIds3)
                        // },1000)
                    }
                }
        })


        addEvent(window,'scroll',function(){
            var t=document.documentElement.scrollTop;
            if(t>=50){
                document.querySelector(".white-bg").style.position="sticky";
                document.querySelector(".white-bg").style.top="50px";
            }
            if(t>=120){
                document.querySelector(".download-tip").style.display="block";
            }else{
                document.querySelector(".download-tip").style.display="none";
            }
        })
    }
}

function mapStateToProps(state) {
    // console.log(state,111111111111111)
    return {
        movieList:state.movies.movieList,
        movieIds:state.movies.movieIds
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getdata(){
            dispatch(action.getmoviesList.call(this))
        },
        getMoredata(movieIds){
            // console.log(movieIds)
            dispatch(action.getNowMoremovielist.call(this,movieIds))
        }
    }


}
export default connect(mapStateToProps,mapDispatchToProps)(Nowplay)
