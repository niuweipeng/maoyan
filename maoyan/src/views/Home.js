import  Movies from "./Movies"
import GuardRouter from "../router/GuuardRouter"
// import  Cinema from "../components/cinema/cinema"
import  CineMa from "./CineMa"
import  My from "./My"
import  React from "react"
import  {
    NavLink,
    Route,
    withRouter
} from "react-router-dom"
 class Home extends  React.Component{
    render(){
      return (
          <div>
              <nav className={"navbottom"}>
                  <NavLink className={"App-link"} activeClassName={"App-active"} to={"/movie"}><span className="iconfont icon-yingpianA" style={{"display":"block","fontSize":"24px","marginBottom":"3px"}}></span>电影</NavLink>
                  <NavLink className={"App-link"} activeClassName={"App-active"} to={"/ciname"}><span className="iconfont icon-yingyuan" style={{"display":"block","fontSize":"24px","marginBottom":"3px"}}></span>影院</NavLink>
                  <NavLink className={"App-link"} activeClassName={"App-active"} to={"/my"}><span className="iconfont icon-zhuomian-" style={{"display":"block","fontSize":"24px","marginBottom":"3px"}}></span>我的</NavLink>
              </nav>
      <Route path={"/movie"}  render={()=><GuardRouter component={Movies}></GuardRouter>}></Route>
              <Route path={"/ciname"} render={()=><GuardRouter component={CineMa}></GuardRouter>}></Route>
              <Route path={"/my"} render={()=><GuardRouter component={My}></GuardRouter>}></Route>
          </div>
      )
    }
    componentWillMount(){
        // console.log(this.props,444444444444)
        if(this.props.location.pathname==="/"){
            this.props.history.push("/movie")
        }
    }
}
export default withRouter(Home)
