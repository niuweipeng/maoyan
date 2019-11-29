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
export const MoremoviesList = (MoremoviesList,type)=>{
    return{
        type:"GET_MOREMOVIES",
        payload:{
            MoremoviesList
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
    getmoviesList(){
        return async (dispatch)=>{
            const  data= await this.$axios.get("/ajax/movieOnInfoList",{
                params:{
                    token:"",

                }
            })
            // console.log(data)
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
    },
    getMoremovielist(movieIds=""){
        return async (dispatch)=>{
            const  data = await this.$axios.get("/ajax/moreComingList",{
                params:{
                    token:"",
                    movieIds
                }
            })
            console.log(data,555555555555555555)
            dispatch(MoremoviesList(data.coming))
        }
    }
}