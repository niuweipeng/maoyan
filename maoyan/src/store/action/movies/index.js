export const movieList = (movieList,movieIds,type)=>{//��ȡ��Ӱҳ�ĵ�һ������
    return{
        type:"GET_MOVIELIST",
        payload:{
            movieList,
            movieIds
        }
    }
}

export const wantlookList = (wantlookList,type)=>{//��ȡӰԺ�ֲ�����
    return{
        type:"GET_WANTLOOKLIST",
        payload:{
            wantlookList
        }
    }
}
export const MoremoviesList = (MoremoviesList,type)=>{//��ȡӰԺ��һ�ε�Ӱ����
    return{
        type:"GET_MOREMOVIES",
        payload:{
            MoremoviesList
        }
    }
}

export const willplaymoviesList = (willplaymoviesList,willmovieIds,type)=>{//��ȡ��Ӱҳ����������
    return{
        type:"GET_WANPLAYLIST",
        payload:{
            willplaymoviesList,
            willmovieIds
        }
    }
}

//��ȡӰԺ������������
export const morewillplaymoviesList = (morewillplaymoviesList,type)=>{
    return{
        type:"GET_MOREWANPLAYLIST",
        payload:{
            morewillplaymoviesList

        }
    }
}


export default {
    getmoviesList(){//��ȡ��Ӱҳ�ĵ�һ������
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
    getWillwantmovie(){//��ȡӰԺ�ֲ�����
        return async (dispatch)=>{
            const  data = await  this.$axios.get("/ajax/mostExpected",{
                params:{
                    ci:localStorage.maoyan_position?JSON.parse(localStorage.maoyan_position).id:"1",
                    limit:10,
                    offset:0,
                    token:""
                }
            })
            // console.log(data.coming)
            dispatch(wantlookList(data.coming))
        }
    },

    getWillwantmovielist(){//��ȡӰԺ��һ�ε�Ӱ����
        return async (dispatch)=>{
            const  data = await  this.$axios.get("/ajax/comingList",{
                params:{
                    ci:localStorage.maoyan_position?JSON.parse(localStorage.maoyan_position).id:"1",
                    limit:10,
                    token:""
                }
            })
            // console.log(data,"hhhhhkkkkkkkk")
            dispatch(willplaymoviesList(data.coming,data.movieIds))
        }
    },
    getNowMoremovielist(movieIds=""){//��ȡ��Ӱҳ����������
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
    getmoreWillwantmovielist(willmovieIds){//��ȡӰԺ������������
        return async (dispatch)=>{
            const  data = await  this.$axios.get("/ajax/moreComingList",{
                params:{
                    ci:localStorage.maoyan_position?JSON.parse(localStorage.maoyan_position).id:"1",
                    limit:10,
                    token:"",
                    movieIds:willmovieIds
                }
            })
            // console.log(data,1222222222222)
            dispatch(morewillplaymoviesList(data.coming))
        }
    },
}