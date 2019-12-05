import React from 'react';
import './App.css';
import  {
    Route,
    Switch
} from "react-router-dom"
import  Home from "./views/Home"
import Login from "./views/Login";
import Register from "./views/Register";
import  DetailMovie from "./views/DetailMovie"
import  DetailCinema from "./views/DetailCinema"
import  InformationMovie from "./views/InformationMovie"
import Position from "./views/Position"
import Search from "./views/Search"
import MoviesList from "./views/MoviesList"
import CinemaList from "./views/CinemaList"
import Preview from "./views/Preview"
import PositionMap from "./components/position"
function App() {
  return (
    <div className="App">
        <Switch>
          <Route path={"/preview"} component={Preview}></Route>
		      <Route path={"/positionMap"} component={PositionMap}></Route>
          <Route path={"/cinemaList"} component={CinemaList}></Route>
          <Route path={"/nogin"} component={Login}></Route>
          <Route path={"/reg"} component={Register}></Route>
          <Route path={"/moviesList"} component={MoviesList}></Route>
          <Route path={"/position"} component={Position}></Route>
          <Route path={"/search"} component={Search}></Route>
          <Route path={"/informationMovie"} component={InformationMovie}></Route>
          <Route path={"/detailCinema"} component={DetailCinema}></Route>
          <Route path={"/detailMovie"} component={DetailMovie}></Route>
          <Route path={"/"} component={Home}></Route>
        </Switch>
        
        
    </div>
  );
}

export default App;

