export const movieList = (movieList,movieIds,type)=>{
    return{
        type:"GET_MOVIELIST",
        payload:{
            movieList,
            movieIds
        }
    }
}

export const wantlookList = (wantlookList,type)=>{
    return{
        type:"GET_WANTLOOKLIST",
        payload:{
            wantlookList
        }
    }
}


export const willplaymoviesList = (willplaymoviesList,type)=>{
    return{
        type:"GET_WANPLAYLIST",
        payload:{
            willplaymoviesList
        }
    }
}

export default {
    getmoviesList(movieIds=""){
        return async (dispatch)=>{
            const  data= await this.$axios.get("/ajax/movieOnInfoList",{
                params:{
                    token:"",
                    movieIds
                }
            })
            console.log(data)
            dispatch(movieList(data.movieList,data.movieIds))
        }
    },
    getWillwantmovie(){
        return async (dispatch)=>{
            const  data = await  this.$axios.get("/ajax/mostExpected",{
                params:{
                    ci:1,
                    limit:10,
                    offset:0,
                    token:""
                }
            })
            // console.log(data.coming)
            dispatch(wantlookList(data.coming))
        }
    },

    getWillwantmovielist(){
        return async (dispatch)=>{
            const  data = await  this.$axios.get("/ajax/comingList",{
                params:{
                    ci:1,
                    limit:10,
                    token:""
                }
            })
            // console.log(data)
            dispatch(willplaymoviesList(data.coming))
        }
    }
}