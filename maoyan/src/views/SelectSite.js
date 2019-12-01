import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
import cinemaActionCreatore, {allCharacterShow,changeCharacterColor} from "../store/action/cinema"
import "../assets/css/cinema/selectSite.css"
class Movie extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div className={"site"}>
                <div className={"navbar"}>
                   <div className={"navbarLeft"}><span className="iconfont icon-left"></span></div>
                   <div className={"navbarRight"}>正华影城</div>
                </div>
                <div className={"seat-block"}>
                    <div className={"movie-info"}>
                        <div className={"movieDetail"}>
                            <div className={"seatTitle"}>利刃出鞘</div>
                            <div className={"seatDate"}>
                                <div className={"seatDateLeft"}>2019-12-01 12:05</div>
                                <div className={"seatDateRight"}>原版2D</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"select-block"}>
                    <div className={"seat-block-wrap"}>
                       <div className={"hall-name-wrapper animate"}>
                           <span className={"hall-name"}>2号 艺术影厅</span>
                       </div>
                        <div className={"row-nav animate"}>
                            {
                                this.props.rowSize.map(v=>(
                                    <div key={v} className={"row-nav1"}>{v}</div>
                                ))
                            }
                        </div>
                        <div className={"seats-block animate"}>
                            <div className={"m-line"}>
                                <div className={"divider"}></div>
                            </div>
                            <div className={"seats-wrap"}>
                                {
                                    this.props.seatsList.map(v=>(
                                        v.seats.map(w=>(
                                            <div key={w.columnId} className={w.seatNo?"wrap wrap1":"wrap"} style={{width:368*1/this.props.columnSize+'px'}}>
                                                <div className={"seat"}></div>
                                            </div>
                                        ))
                                    ))
                                }
                            </div>
                            <div className={"mew-info"}>
                                <img src="data:image/png;base64,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" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
       this.props.getSeats.call(this);
    }
}
function mapStateToProps(state) {
    console.log(368*1/state.cinemaReducer.columnSize+'px')
    console.log(state.cinemaReducer.columnSize,"sdkjjjjjjjjjjjjjn;");
    console.log(state.cinemaReducer.rowSize,"sdkjjjjjjjjjjjjjn;");

    return{
        seatsList:state.cinemaReducer.seatsList,
        columnSize:state.cinemaReducer.columnSize,
        rowSize:state.cinemaReducer.rowSize,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getSeats(){
            dispatch(cinemaActionCreatore.getSeatsList.call(this))
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Movie);