export const moviesList_actor = (payload)=>{
    return {
        type:"GET_ALL_MOVIES",
        payload
    }
}
export const moviesList_next = (payload)=>{
    return {
        type:"GET_NEXT_MOVIES",
        payload
    }
}
export default {
     getAllMovies(id,keyWord,offset){
        return async(dispatch)=>{
            const data = await this.$axios.get("/searchlist/movies",{
                params:{
                    keyword:keyWord,
                    ci:id,
                    offset:offset,
                    limit:20
                }
            })
            console.log(data)
            dispatch(moviesList_actor({
                movies:data.movies,
                total:data.total
            }))
        }
    },
    getNextMovies(id,keyWord,offset){
        return async(dispatch)=>{
            const data = await this.$axios.get("/searchlist/movies",{
                params:{
                    keyword:keyWord,
                    ci:id,
                    offset:offset,
                    limit:20
                }
            })
            console.log(data)
            dispatch(moviesList_next({
                moviesNext:data.movies,
                total:data.total
            }))
        }
    }
}