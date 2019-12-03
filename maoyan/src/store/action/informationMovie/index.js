import axios from "axios";

export const getThreeNum = payload => ({
    type:"GET_NUM",
    payload
})
export default {
    getNum(movieId){
        return(dispatch)=>{
            axios.get("/asgard/asgardapi/review/realtime/data.json",{
                params:{
                    movieId
                }
            }).then((data)=>{
                const {snum,watched,wish} = data.data
                dispatch(getThreeNum({
                    snum,watched,wish
                }))
            })
        }
    }
}