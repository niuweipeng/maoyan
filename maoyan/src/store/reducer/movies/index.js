import  obj from "../../state/movies"
const  reducer = function (state=obj,{type,payload}) {
    state = JSON.parse(JSON.stringify(state))
    if(type==="GET_MOVIELIST"){
        state.movieList=[
            ...state.movieList,
            ...payload.movieList
        ]
        state.movieIds=payload.movieIds
    }
    if(type==="GET_WANTLOOKLIST"){
        state.wantlookList=payload.wantlookList
    }
    if(type==="GET_WANPLAYLIST"){
        state.willplaymoviesList=payload.willplaymoviesList
    }
    console.log(state,11111111111111111)
    return state
}
export default  reducer