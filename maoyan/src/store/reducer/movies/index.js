import  obj from "../../state/movies"
const  reducer = function (state=obj,{type,payload}) {
    state = JSON.parse(JSON.stringify(state))
    if(type==="GET_MOVIELIST"){
        state.movieList= payload.movieList
        state.movieIds=payload.movieIds
    }
    if(type==="GET_WANTLOOKLIST"){
        state.wantlookList=payload.wantlookList
    }
    if(type==="GET_WANPLAYLIST"){
        state.willplaymoviesList=payload.willplaymoviesList
        state.willmovieIds=payload.willmovieIds
    }
    if(type==="GET_MOREMOVIES"){
        // console.log(payload.MoremoviesList)
        state.movieList= [
            ...state.movieList,
            ...payload.MoremoviesList
        ]
    }
        if(type==="GET_MOREWANPLAYLIST"){
        // console.log(payload.morewillplaymoviesList)
        state.willplaymoviesList= [
            ...state.willplaymoviesList,
            ...payload.morewillplaymoviesList
        ]
    }
    // console.log(state,"kkkkkkkkkkkkkkkk")
    return state
}
export default  reducer