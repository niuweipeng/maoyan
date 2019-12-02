import React from 'react';
import './App.css';
import  {
    Route
} from "react-router-dom"
import  Home from "./views/Home"
import  Detail from "./views/detail"
import Login from "./views/Login";
import Register from "./views/Register";
function App() {
  return (
    <div className="App">
            <Route path={"/nogin"} component={Login}></Route>
        <Route path={"/reg"} component={Register}></Route>
        <Route path={"/"} component={Home}></Route>
        <Route path={"/detail"} component={Detail}></Route>
    </div>
  );
}

export default App;
