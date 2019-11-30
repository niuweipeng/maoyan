import  {
    combineReducers
} from "redux"
import  cinemaReducer from "./cinema"
import  movies from "./movies"
export  default  combineReducers({
    cinemaReducer,
    movies
})