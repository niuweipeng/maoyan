import initState from "../../state/informationMovie";
export default function(state=initState,{type,payload}){
    state=JSON.parse(JSON.stringify(state));
    if(type === "GET_NUM"){
        state.snum = payload.snum
        state.watched = payload.watched
        state.wish = payload.wish
    }
    return state;
}