import initState from "../../state/detailCinema";
export default function(state=initState,{type,payload}){
    state=JSON.parse(JSON.stringify(state));
    if(type === "GET_DETAILMOVIE_T"){
        state.cinemaData = payload.cinemaData
        state.dealList = payload.dealList
        state.showData = payload.showData
        state.sendInfo = payload.sendInfo
    }
    // if(type === "SENDINFO"){
    //     state.sendInfo = payload.sendInfo
    // }
    return state;
}