export const movieList = (movieList,movieIds,type)=>{//获取电影页的第一次数据
    return{
        type:"GET_MOVIELIST",
        payload:{
            movieList,
            movieIds
        }
    }
}

export const wantlookList = (wantlookList,type)=>{//获取影院轮播数据
    return{
        type:"GET_WANTLOOKLIST",
        payload:{
            wantlookList
        }
    }
}
export const MoremoviesList = (MoremoviesList,type)=>{//获取影院第一次电影数据
    return{
        type:"GET_MOREMOVIES",
        payload:{
            MoremoviesList
        }
    }
}

export const willplaymoviesList = (willplaymoviesList,willmovieIds,type)=>{//获取电影页的下拉数据
    return{
        type:"GET_WANPLAYLIST",
        payload:{
            willplaymoviesList,
            willmovieIds
        }
    }
}

//获取影院下拉更多数据
export const morewillplaymoviesList = (morewillplaymoviesList,type)=>{
    return{
        type:"GET_MOREWANPLAYLIST",
        payload:{
            morewillplaymoviesList

        }
    }
}


export default {
    getmoviesList(){//获取电影页的第一次数据
        return async (dispatch)=>{
            const  data= await this.$axios.get("/ajax/movieOnInfoList",{
                params:{
                    token:"",
                }
            })
            // console.log(data,"hhhhhhhhhhhhhh")
            dispatch(movieList(data.movieList,data.movieIds))
        }
    },
    getWillwantmovie(){//获取影院轮播数据
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

    getWillwantmovielist(){//获取影院第一次电影数据
        return async (dispatch)=>{
            const  data = await  this.$axios.get("/ajax/comingList",{
                params:{
                    ci:1,
                    limit:10,
                    token:""
                }
            })
            // console.log(data,"hhhhhkkkkkkkk")
            dispatch(willplaymoviesList(data.coming,data.movieIds))
        }
    },
    getNowMoremovielist(movieIds=""){//获取电影页的下拉数据
        return async (dispatch)=>{
            const  data = await this.$axios.get("/ajax/moreComingList",{
                params:{
                    token:"",
                    movieIds,
                    a:1
                }
            })
            // console.log(data,555555555555555555)
            dispatch(MoremoviesList(data.coming))
        }
    },
    getmoreWillwantmovielist(willmovieIds){//获取影院下拉更多数据
        return async (dispatch)=>{
            const  data = await  this.$axios.get("/ajax/moreComingList",{
                params:{
                    ci:1,
                    limit:10,
                    token:"",
                    movieIds:willmovieIds
                }
            })
            dispatch(morewillplaymoviesList(data.coming))
        }
    },
}