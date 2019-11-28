import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
class Cinema extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <p onClick={()=>this.props.history.push("/position")}>定位</p>
                <p onClick={()=>this.props.history.push("/search")}>搜索</p>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return{

    }
}
function mapDispatchToProps(dispatch) {
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cinema);