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
                        <p className="position-title">定位城市{}</p>
                        <div className="position-box clearfix">
                            <span className="position-info" onClick={()=>this.props.history.push("/positionMap")}>
                                    {localStorage.position ?
                                        localStorage.position.slice(0,2):"定位失败，请点击重试"
                                    }
                            </span>
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
                                        this.props.goBack.call(this,v.id, v.nm)
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
                                        this.props.goBack.call(this,v.id,v.nm)
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
                                                    this.props.goBack.call(this,k.id, k.nm)
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
    // console.log(this.props)
    }
}

function mapStateToProps(state) {
    return {
        cities: state.position.cities,
        hotCities: state.position.hotCities,
        historyCity: state.position.historyCity,
        cityList:state.position.cityList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHistoryCity(id, nm) {
            dispatch(action.getHistoryCity.call(this, id, nm))
        },
        goBack(id,nm){
            this.props.history.go(-1)
            localStorage.maoyan_position = JSON.stringify({id,nm})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Position);