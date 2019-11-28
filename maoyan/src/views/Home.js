import React from "react";
import {
    NavLink,
    Route
} from "react-router-dom"
import Movie from "./Movie";
import Cinema from "./Cinema";
import My from "./My";
import '../App.css';
export default class App extends React.Component{
    render(){
        return (
            <div>
                <nav className={"Nav"}>
                    <NavLink className={"App-link"} activeClassName={"App-active"} exact to={"/"}>电影</NavLink>
                    <NavLink className={"App-link"} activeClassName={"App-active"} to={"/cinema"}>影院</NavLink>
                    <NavLink className={"App-link"} activeClassName={"App-active"} to={"/my"}>我的</NavLink>
                </nav>
                <Route path={"/"} exact component={Movie}></Route>
                <Route path={"/cinema"} component={Cinema}></Route>
                <Route path={"/my"} component={My}></Route>
            </div>
        )
    }
}