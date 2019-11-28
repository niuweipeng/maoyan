import initState from "../../state/search"
export default function(state = initState,{type,payload}){
    state = JSON.parse(JSON.stringify(state))
    // console.log(payload)
    if (type === "GET_DETAIL"){
        state.movies = payload.movies
        state.total = payload.total
        state.keyWord = payload.keyWord
        state.cinemas = payload.cinemas
        if(payload.keyWord!==""){
            state.kw.push(payload.keyWord)
            let newArr = new Set(state.kw)
            localStorage.kw = [...newArr];
        }
    }

    // localStorage.setItem('keyWord',JSON.stringify(state.keyWord));

    return state
}
