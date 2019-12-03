import initState from "../../state/moviesList"
export default function(state = initState,{type,payload}){
    state = JSON.parse(JSON.stringify(state))
    if(type === "GET_ALL_MOVIES"){
        if(payload.movies){
            state.moviesList = [
                ...state.moviesList,
                ...payload.movies
            ]
        }
        state.total = payload.total
        state.count = Math.ceil(payload.total/20)
    }
    if(type === "GET_NEXT_MOVIES"){
        if(payload.moviesNext){
            state.moviesList = [
                ...state.moviesList,
                ...payload.moviesNext
            ]
        }
        state.total = payload.total
    }
    return state
}
