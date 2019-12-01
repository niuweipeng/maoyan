import  {
    combineReducers
} from "redux"
import  cinemaReducer from "./cinema"
import  movies from "./movies"
import  detailMovie from "./detailMovie"
import  detailCinema from "./detailCinema"
export  default  combineReducers({
    cinemaReducer,
    movies,
    detailMovie,
    detailCinema
})