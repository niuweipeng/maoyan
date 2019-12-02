import React from "react";
import action from "../store/action/position"
import "../assets/css/position/position.css"
import {
    connect
} from "react-redux"

class Position extends React.Component {
    render() {
        return (
            <div>
                <div className="position-all">
                    <div className="position-list">
                        <p className="position-title">定位城市</p>
                        <div className="position-box clearfix">
                            <span className="position-info">定位失败，请点击重试</span>
                        </div>
                    </div>
                </div>
                <div className="position-all"
                     style={{display: localStorage.Maoyan_historyCity.length > 2 ? "block" : "none"}}>
                    <div className="position-list">
                        <p className="position-title">最近访问城市</p>
                        <div className="position-box clearfix">
                            {
                                this.props.historyCity.map((v, i) => (
                                    <span className="position-info" key={i} onClick={() => {
                                        this.props.getHistoryCity(v.id, v.nm)
                                    }}>{v.nm}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="position-all">
                    <div className="position-list">
                        <p className="position-title">热门城市</p>
                        <div className="position-box clearfix">
                            {
                                this.props.hotCities.map(v => (
                                    <span className="position-info" key={v.id} onClick={() => {
                                        this.props.getHistoryCity(v.id, v.nm)
                                    }}>{v.nm}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="position-all">
                    <div className="position-list">
                        {
                            this.props.cities.map((v, i) => (
                                <div key={i}>
                                    <p className="position-title">{v.name}</p>
                                    {
                                        v.cityList.map(k => (
                                            <div className="position-box-two clearfix" key={k.id}>
                                                <span className="position-each" onClick={() => {
                                                    this.props.getHistoryCity(k.id, k.nm)
                                                }}>{k.nm}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="position-right">
                    <div>定位</div>
                    <div>最近</div>
                    <div>热门</div>
                    {
                        this.props.cities.map((v, i) => (
                            <div key={i}>{v.name}</div>
                        ))
                    }
                </div>

            </div>
        )
    }

    componentDidMount() {
        // console.log(localStorage.Maoyan_historyCity)
        // console.log(Map)
    }
}

function mapStateToProps(state) {
    return {
        cities: state.position.cities,
        hotCities: state.position.hotCities,
        historyCity: state.position.historyCity
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHistoryCity(id, nm) {
            dispatch(action.getHistoryCity.call(this, id, nm))
            //     dispatch({
            //         type:"GET_HISTORY_CITY",
            //         payload:{
            //             historyCity:{cityId:id,cityname:nm}
            //         }
            //     })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Position);