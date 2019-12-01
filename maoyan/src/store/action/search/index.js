export const search_movies = (payload) => {
    return {
        type: "GET_DETAIL",
        payload
    }
}
export const search_cinemas = (payload) => {
    return {
        type: "GET_DETAIL",
        payload
    }
}
export default {
    getDetail(keyWord) {
        return async (dispatch) => {
            const data = await this.$axios.get("/ajax/search", {
                params: {
                    kw: keyWord,
                    cityId: 1,
                    stype: -1
                }
            })
            // console.log(data)
            if(!data.movies){
                this.refs.keyWord.value=""
                alert("输入错误")
                document.querySelector(".search-body").removeChild(document.querySelector(".one-two"))
            }else{
                if (data.cinemas && data.movies) {
                    dispatch(search_movies({
                            movies: data.movies.list,
                            cinemas: data.cinemas.list,
                            all: data.cinemas.total,
                            total: data.movies.total,
                            keyWord: keyWord
                        })
                    )
                } else if (!data.cinemas) {
                    dispatch(search_cinemas({
                        movies: data.movies.list,
                        total: data.movies.total,
                        keyWord: keyWord
                    }))
                }

            }
        }
    }
}