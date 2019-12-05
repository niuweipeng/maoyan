import React,{Component} from "react";
import {
    withRouter
} from "react-router-dom"
class GuardRouter extends Component{
    componentWillMount(){
        console.log(2222,this.props.location.pathname)
        if(this.props.location.pathname === "/my"){
            // if(!localStorage.userName)
                this.props.history.push({
                    pathname:"/nogin",
                    state:{goUrl:this.props.location.pathname
                }})
        }
        // if(!localStorage.userName)
        //     this.props.history.push("/login")
    }
    render(){
        return (
            // <div></div>
            <this.props.component></this.props.component>
        )
    }
}
export default withRouter(GuardRouter);