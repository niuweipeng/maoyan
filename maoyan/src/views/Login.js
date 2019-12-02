import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import "../assets/css/login/index.css"
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Link,
    Switch,
} from "react-router-dom"

import Meituan from "../components/login/meituan"
import Phone from "../components/login/phone"

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className={"header"}>猫眼电影</div>
                {/*<Router>*/}
                <nav style={{
                    color: "red",
                }}>
                    <div style={{
                        width: "50%",
                        display: "inline-block",
                        // borderBottom:"1px solid",
                        boxSizing: "border-box"
                    }}>
                        <NavLink to={"/nogin/meituan"}
                                 activeClassName={"active-meituan"}
                                 exact
                                 style={{
                                     textAlign: "center",
                                     textDecoration: "none",
                                     padding: "20px 0 10px",
                                     boxSizing: "border-box",
                                     display: "block"
                                 }}>Email登录</NavLink>
                    </div>
                    <div style={{
                        width: "50%",
                        display: "inline-block",
                        textAlign: "center"
                    }}>
                        <NavLink to={"/nogin/phone"}
                                 activeClassName={"active-meituan"}
                                 style={{
                                     textDecoration: "none",
                                     padding: "20px 0 10px",
                                     boxSizing: "border-box",
                                     display: "block",
                                 }}>手机号登录</NavLink>
                    </div>
                </nav>
                <Switch>
                    {/*<Meituan></Meituan>*/}
                    {/*    <Route path={"/login/phone"}  component={Phone}></Route>*/}
                    <Route path={"/nogin/meituan"}  component={Meituan}></Route>
                    <Route path={"/nogin/phone"}  component={Phone}></Route>


                </Switch>
                <div className={"meituan-reg"}>
                    <Link to={"/reg"} style={{
                        textDecoration:"none"
                    }}>立即注册</Link>

                </div>
                {/*</Router>*/}
            </div>
        )
    }
}
