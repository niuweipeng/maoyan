import initState from "../../state/cinemasList"
export default function(state = initState,{type,payload}){
    state = JSON.parse(JSON.stringify(state))
    if(type === "GET_ALL_CINEMA"){
        if(payload.cinemas){
            state.cinemasList = [
                ...state.cinemasList,
                ...payload.cinemas,
            ]
        }
        state.total = payload.total
        state.count = Math.ceil(payload.total/20)
    }
    if(type === "GET_NEXT_CINEMA"){
        if(payload.cinemasNext){
            state.cinemasList = [
                ...state.cinemasList,
                ...payload.cinemasNext
            ]
        }
    }
    // console.log(state)
    return state
}
