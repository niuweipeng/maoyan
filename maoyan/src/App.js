import React from 'react';
import './App.css';
import {
    Route,
    NavLink,
    Switch
} from "react-router-dom"
import Login from "./views/Login"
import Home from "./views/Home"
import Position from "./views/Position"
import Search from "./views/Search"
function App() {
  return (

    <div className="App">
        <Switch>
            <Route path={"/position"} component={Position}></Route>
            <Route path={"/search"} component={Search}></Route>
            <Route path={"/login"} component={Login}></Route>
            <Route path={"/"} component={Home}></Route>
        </Switch>
    </div>
  );
}

export default App;
