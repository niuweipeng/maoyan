import React from 'react';
import './App.css';
import  {
    Route,
    Switch
} from "react-router-dom"
import  Home from "./views/Home"
<<<<<<< HEAD
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
=======
import  DetailMovie from "./views/DetailMovie"
import  DetailCinema from "./views/DetailCinema"
import  InformationMovie from "./views/InformationMovie"
import Position from "./views/Position"
import Search from "./views/Search"
import MoviesList from "./views/MoviesList"
import CinemaList from "./views/CinemaList"
function App() {
  return (
    <div className="App">
        <Switch>
 <Route path={"/cinemaList"} component={CinemaList}></Route>
            <Route path={"/moviesList"} component={MoviesList}></Route>
            <Route path={"/position"} component={Position}></Route>
            <Route path={"/search"} component={Search}></Route>
          <Route path={"/informationMovie"} component={InformationMovie}></Route>
          <Route path={"/detailCinema"} component={DetailCinema}></Route>
          <Route path={"/detailMovie"} component={DetailMovie}></Route>
          <Route path={"/"} component={Home}></Route>
        </Switch>
        
        
>>>>>>> 127dbd52298ba5fbe4ddc82cd169c34e0abbe3b2
    </div>
  );
}

export default App;
