import axios from "axios";

export const getDetaiList = payload => ({
    type:"GET_DETAILMOVIE_T",
    payload
})
// export const getSendInfo = payload => ({
//     type:"SENDINFO",
//     payload
// })
export default {
    getDetailMovie(cinemaId){
        return(dispatch)=>{
            axios.get("/ajax/cinemaDetail",{
                params:{
                    cinemaId
                }
            }).then((data)=>{
                const {cinemaData,dealList,showData} = data
                const sendInfo = showData.movies[0]
                dispatch(getDetaiList({
                    cinemaData,
                    dealList,
                    showData,
                    sendInfo
                }))
            })
        }
    },
}