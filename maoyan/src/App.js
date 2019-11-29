import React from 'react';
import './App.css';
import  {
    Route
} from "react-router-dom"
import  Home from "./views/Home"
import  Detail from "./views/detail"
function App() {
  return (
    <div className="App">

        <Route path={"/"} component={Home}></Route>
        <Route path={"/detail"} component={Detail}></Route>
    </div>
  );
}

export default App;
