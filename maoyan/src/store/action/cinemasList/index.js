export const cinemasList_actor = (payload)=>{
    return {
        type:"GET_ALL_CINEMA",
        payload
    }
}
export default {
    getAllCinemas(id,keyWord,offset){
        return async(dispatch)=>{
            console.log(offset)
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

    }
}