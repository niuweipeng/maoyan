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
                <div className="navbar" ref={"header"}>
                    <div className="nav-wrap-left">
                        <span className="iconfont icon-left" onClick={() =>
                            this.props.history.go(-1)
                        }></span>
                    </div>
                    <h1 className="nav-header">猫眼电影</h1>
                </div>
                <div className="cinemas-body" ref={node => this.contentNode = node}>
                    {
                        this.props.cinemas ? this.props.cinemas.map(v => (
                            <div className="cinemas-detail-list" key={v.id}>
                                <div className="cinemas-detail-list-mid">
                                    <p className="name">
                                        <span className="three-title">{v.nm}</span>
                                        <span className="four-title">{v.sellPrice + "元起"}</span>
                                    </p>
                                    <div className="cinemas-detail">
                                        <div className="cinemas-detail-left">
                                            <p className="address-three">{v.addr}</p>
                                        </div>
                                        <div className="cinemas-detail-right">
                                            <span className="distance">{v.distance}</span>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: "80%",
                                        fontSize: "14px",
                                    }}>
                                        <div className="choose">座</div>
                                        <div className="choose" style={{
                                            display: v.allowRefund === 1 ? "block" : "none"
                                        }}>{v.allowRefund === 1 ? "退" : null}</div>
                                        <div className="choose" style={{
                                            display: v.endorse === 1 ? "block" : "none"
                                        }}>{v.endorse === 1 ? "改签" : null}</div>
                                        {
                                            v.hallType ? v.hallType.map((m, i) => (
                                                <div className="choose" style={{
                                                    display: v.hallType ? "block" : "none"
                                                }} key={i}>{m}</div>
                                            )) : ""
                                        }
                                        <div className="choose-two" style={{
                                            display: v.snack === 1 ? "block" : "none",
                                        }}>{v.snack === 1 ? "小吃" : null}</div>
                                    </div>
                                </div>
                            </div>
                        )) : ""

                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        const {id, keyWord} = this.props.location.state;
        let offset = this.props.offset;
        this.props.getAllCinemas.call(this, id, keyWord, offset);
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        offset: state.cinemasList.offset,
        cinemas: state.cinemasList.cinemasList,
        total: state.cinemasList.total,
        count: state.cinemasList.count
    }
}

function mapDispatchProps(dispatch) {
    return {
        getAllCinemas(id, keyWord, offset) {
            dispatch(action.getAllCinemas.call(this, id, keyWord, offset))
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(CinemaList)