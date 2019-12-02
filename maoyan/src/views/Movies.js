import  React  from "react"
import "../assets/css/movies/index.css"
import  {
    Route,
    NavLink,
} from "react-router-dom"
import  Nowplay from "./Nowplay"
import  Willplay from "./Willplay"
class  Movies extends  React.Component{
    render(){
        return(
            <div className={"movieshappen"}>
                <div className={"Firsttitle"}>猫眼电影</div>

                <div className="download-app-bar">
                    <img className={"img noneBg logo"} alt={""} src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png" width="42" height="42"/>
                    <div className={"app-name-desc"}>
                        <div className={"app-name"}>猫眼</div>
                        <div className={"app-desc"}>在线选座，热门影讯，爱上看电影</div>
                    </div>
                    <div className={"btn-open-app"}>立即打开</div>
                </div>

                <div className={"white-bg topbar-bg "} >
                    <div className={"city-entry"} onClick={()=>this.props.history.push("/position")}>
                        <span className={"city-name"}>北京</span>
                        <span className={"iconfont icon-shangjiantou1"} style={{fontSize:"12px",marginLeft:"10px"}}></span>
                    </div>
                    <nav className={"switch-hot"} data-active=".n-hot">
                        <NavLink to={"/movie"} exact className={"hot-item"} activeClassName={"hot-item active"} style={{"textDecoration": "none"}}>正在热映</NavLink>
                        <NavLink to={"/movie/willplay"} className={"hot-item"} activeClassName={"hot-item active"} style={{"textDecoration": "none"}}>即将热映</NavLink>

                    </nav>
                   <div className={"search-entry search-icon"} data-type="movie"><span className="iconfont icon-glass" style={{"fontSize":"26px","color":"red"}}></span></div>
                </div>
                <Route path={"/movie/willplay"} component={Willplay}></Route>
                <Route path={"/movie"} component={Nowplay} exact></Route>
                <div>
                    <a id="download-tip" className={"download-tip"}></a>
                </div>
            </div>
        )
    }

}

export default Movies