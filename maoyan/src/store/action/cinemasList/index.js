export const cinemasList_actor = (payload)=>{
    return {
        type:"GET_ALL_CINEMA",
        payload
    }
}
export const cinemasList_next = (payload)=>{
    return {
        type:"GET_NEXT_CINEMA",
        payload
    }
}
export default {
    getAllCinemas(id,keyWord,offset){
        return async(dispatch)=>{
            const data = await this.$axios.get("/searchlist/cinemas",{
                params:{
                    keyword:keyWord,
                    ci:id,
                    offset:offset,
                    limit:20
                }
            })
            dispatch(cinemasList_actor({
                cinemas:data.cinemas,
                total:data.total
            }))
        }
    },
    getNextCinemas(id,keyWord,offset){
        return async(dispatch)=>{
            const data = await this.$axios.get("/searchlist/cinemas",{
                params:{
                    keyword:keyWord,
                    ci:id,
                    offset:offset,
                    limit:20
                }
            })
            dispatch(cinemasList_next({
                cinemasNext:data.cinemas,
                total:data.total
            }))
        }
    }
}