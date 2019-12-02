export const position_city = (payload)=>{
    return {
        type:"GET_HISTORY_CITY",
        payload
    }

}
export default {
    getHistoryCity(id,nm){
        return (dispatch)=>{
            dispatch(position_city({
                historyCity:{cityId:id,cityname:nm}
            }))
        }
        }

}