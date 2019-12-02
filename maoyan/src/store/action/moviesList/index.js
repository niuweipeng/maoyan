export const moviesList_actor = (payload)=>{
    return {
        type:"GET_ALL_MOVIES",
        payload
    }
}
export default {
     getAllMovies(id,keyWord,offset){
         // console.log(id,keyWord,offset)
        return async(dispatch)=>{
             // console.log(this)
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

    }
}