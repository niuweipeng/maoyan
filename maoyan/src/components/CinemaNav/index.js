import React from "react";
import {
    withRouter
} from "react-router-dom"
import "../../assets/css/cinemaNav/cinemaNav.css"
class CinemaNav extends React.Component {
    render(){
        return (
            <div>
                <div className="cinemaNav">
                    <div className="cinemaNav-left">
                        <span className="cinemaNav-city" 
                        onClick={()=>this.props.history.push("/position")}>{JSON.parse(localStorage.maoyan_position).nm}</span>
                        <span className="iconfont iconfont-last icon-shangjiantou1" style={{"fontSize":"6px"}}></span>
                    </div>
                    <div className="cinemaNav-search" onClick={()=>this.props.history.push("/search")}>
                        <span className="iconfont iconfont-ss icon-sousuo"></span>
                        <span className="cinemaNav-context">搜影院</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(CinemaNav);