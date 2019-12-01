import axios from "axios";

export const getDetai = payload => ({
    type:"GET_DETAILMOVIE",
    payload
})
export const getShowDays = payload => ({
    type:"GET_SHOWDAYS",
    payload
})
export default {
    getDetailMovie(movieId){
        return(dispatch)=>{
            axios.get("/ajax/detailmovie",{
                params:{
                    movieId
                }
            }).then((data)=>{
                const detailMovie = data.detailMovie
                dispatch(getDetai({
                    detailMovie
                }))
                this.getCinemasList(detailMovie.id);
            })
        }
    },
    getCinemasList(id){
        const params = {
            movieId: id,
            day: "",
            offset: 0,
            limit: 20,
            districtId: -1,
            lineId: -1,
            hallType: -1,
            brandId: -1,
            serviceId: -1,
            areaId: -1,
            stationId: -1,
            item: true,
            updateShowDay: true,
            reqId: "",
            cityId: 1
        }
        return(dispatch)=>{
            axios.post("/ajax/movie?"+"forceUpdate="+new Date(),params).then((data)=>{
                const showDays = data.showDays
                dispatch(getShowDays({
                    showDays
                }))
            })
        } 
    }
}