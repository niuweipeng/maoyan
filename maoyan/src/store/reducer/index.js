import  {
    combineReducers
} from "redux"
import  cinemaReducer from "./cinema"
import  movies from "./movies"
import  detailMovie from "./detailMovie"
import  detailCinema from "./detailCinema"
import search from "./search"
import position from "./position"
import moviesList from "./moviesList"
import cinemasList from "./cinemasList"
import informationMovie from "./informationMovie"
export  default  combineReducers({
    cinemaReducer,
    movies,
    detailMovie,
    detailCinema,
    search,
    position,
    moviesList,
    cinemasList,
    informationMovie
})