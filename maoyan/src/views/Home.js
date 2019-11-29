import  Movies from "./Movies"
import  Cinema from "./Cinema"
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
                  <NavLink className={"App-link"} activeClassName={"App-active"} to={"/movie"}><span className="iconfont" style={{"display":"block","fontSize":"24px"}}>&#xe652;</span>电影</NavLink>
                  <NavLink className={"App-link"} activeClassName={"App-active"} to={"/ciname"}><span className="iconfont" style={{"display":"block","fontSize":"24px"}}>&#xe662;</span>影院</NavLink>
                  <NavLink className={"App-link"} activeClassName={"App-active"} to={"/my"}><span className="iconfont" style={{"display":"block","fontSize":"24px"}}>&#xe61b;</span>我的</NavLink>
              </nav>
              <Route path={"/movie"} component={Movies}></Route>
              <Route path={"/ciname"} component={Cinema}></Route>
              <Route path={"/my"} component={My}></Route>
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
