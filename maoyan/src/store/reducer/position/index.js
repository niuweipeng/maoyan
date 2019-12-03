import initState from "../../state/position"
export default function(state = initState,{type,payload}) {
    state = JSON.parse(JSON.stringify(state))
    localStorage.Maoyan_cities = JSON.stringify(state.cities)
    localStorage.Maoyan_cityList = JSON.stringify(state.cityList)
    localStorage.Maoyan_hotCities = JSON.stringify(state.hotCities)
    let newArr = []
    if(type === "GET_HISTORY_CITY"){
        // state.historyCity.unshift(payload.historyCity)

        let info = state.cityList.find(v=>v.id===payload.historyCity.cityId)
        if(!state.historyCity.find(v=>v.id === info.id)){
            state.historyCity .unshift(info);
        }
        if(state.historyCity.length>8){
            state.historyCity.pop()
        }

    }
    localStorage.Maoyan_historyCity =  JSON.stringify(state.historyCity)

    return state
}