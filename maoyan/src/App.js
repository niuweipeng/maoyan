import React from 'react';
import './App.css';
import  {
    Route,
    Switch
} from "react-router-dom"
import  Home from "./views/Home"
import  DetailMovie from "./views/DetailMovie"
import  DetailCinema from "./views/DetailCinema"
function App() {
  return (
    <div className="App">
        <Switch>
          <Route path={"/detailCinema"} component={DetailCinema}></Route>
          <Route path={"/detailMovie"} component={DetailMovie}></Route>
          <Route path={"/"} component={Home}></Route>
        </Switch>
        
        
    </div>
  );
}

export default App;
