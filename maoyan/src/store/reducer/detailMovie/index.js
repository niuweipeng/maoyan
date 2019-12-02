import initState from "../../state/detailMovie";
export default function(state=initState,{type,payload}){
    state=JSON.parse(JSON.stringify(state));
    if(type === "GET_DETAILMOVIE"){
        state.detailMovie = payload.detailMovie
    }
    if(type === "GET_SHOWDAYS"){
        state.showDays = payload.showDays
    }
    return state;
}