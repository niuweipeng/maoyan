import React from "react"
import {
    connect
} from "react-redux"
import action from "../store/action/cinemasList";
import "../assets/css/cinemaList/cinemaList.css"

class CinemaList extends React.Component {
    render() {
        return (
            <div>
                <div className="navbar_cinemaList">
                    <div className="nav-wrap-left_cinemaList">
                        <span className="iconfont iconfont_cinemaList icon-left" onClick={() =>
                            this.props.history.go(-1)
                        }></span>
                    </div>
                    <h1 className="nav-header">猫眼电影</h1>
                </div>
                <div className="cinemas-body_cinemaList">
                    <ul className="cinema_list">
                        {
                            this.props.cinemas ? this.props.cinemas.map((v,i) => (
                                <li className="cinemas-detail-list_cinemaList" key={v.id+i}>
                                    <div className="cinemas-detail-list-mid_cinemaList">
                                        <p className="name_cinemaList">
                                            <span className="three-title_cinemaList">{v.nm}</span>
                                            <span className="four-title_cinemaList">{v.sellPrice + "元起"}</span>
                                        </p>
                                        <div className="cinemas-detail_cinemaList">
                                            <div className="cinemas-detail-left_cinemaList">
                                                <p className="address-three_cinemaList">{v.addr}</p>
                                            </div>
                                            <div className="cinemas-detail-right_cinemaList">
                                                <span className="distance_cinemaList">{v.distance}</span>
                                            </div>
                                        </div>
                                        <div style={{
                                            width: "80%",
                                            fontSize: "14px",
                                        }}>
                                            <div className="choose_cinemaList">座</div>
                                            <div className="choose_cinemaList" style={{
                                                display: v.allowRefund === 1 ? "block" : "none"
                                            }}>{v.allowRefund === 1 ? "退" : null}</div>
                                            <div className="choose_cinemaList" style={{
                                                display: v.endorse === 1 ? "block" : "none"
                                            }}>{v.endorse === 1 ? "改签" : null}</div>
                                            {
                                                v.hallType ? v.hallType.map((m, i) => (
                                                    <div className="choose_cinemaList" style={{
                                                        display: v.hallType ? "block" : "none"
                                                    }} key={i}>{m}</div>
                                                )) : ""
                                            }
                                            <div className="choose-two_cinemaList" style={{
                                                display: v.snack === 1 ? "block" : "none",
                                            }}>{v.snack === 1 ? "小吃" : null}</div>
                                        </div>
                                    </div>
                                </li>
                            )) : ""
                        }
                    </ul>

                </div>
            </div>
        )
    }

    componentDidMount() {
        const {id, keyWord} = this.props.location.state;
        let offset = this.props.offset;
        this.props.getAllCinemas.call(this, id, keyWord, offset);

        const _this = this
        function getScrollTop(){
            var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
            if(document.body){
                bodyScrollTop = document.body.scrollTop;
            }
            if(document.documentElement){
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        }
//文档的总高度
        function getScrollHeight(){
            var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
            if(document.body){
                bodyScrollHeight = document.body.scrollHeight;
            }
            if(document.documentElement){
                documentScrollHeight = document.documentElement.scrollHeight;
            }
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            return scrollHeight;
        }
        function getWindowHeight(){
            var windowHeight = 0;
            if(document.compatMode == "CSS1Compat"){
                windowHeight = document.documentElement.clientHeight;
            }else{
                windowHeight = document.body.clientHeight;
            }
            return windowHeight;
        }
        window.onscroll = function(){
            if(Math.floor(getScrollTop() + getWindowHeight()) == getScrollHeight()){
                let timer = setTimeout(()=>{
                    _this.props.getNextCinemas.call(_this, id, keyWord, offset+20);
                },2000)
            }
        };
        clearTimeout(this.timer)
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        offset: state.cinemasList.offset,
        cinemas: state.cinemasList.cinemasList,
        total: state.cinemasList.total
    }
}

function mapDispatchProps(dispatch) {
    return {
        getAllCinemas(id, keyWord, offset) {
            dispatch(action.getAllCinemas.call(this, id, keyWord, offset))
        },
        getNextCinemas(id, keyWord, offset) {
            dispatch(action.getNextCinemas.call(this, id, keyWord, offset))
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(CinemaList)