import React from "react"
import html from "../../assets/position/map"

class PositionMap extends React.Component {
    render (){
        return (
            <div>
                <iframe
                    title="resg"
                    srcDoc={html}
                    style={{ width: '100%', border: '0px', height: '667px' }}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    scrolling="auto"
                />
                {/*<span className="iconfont icon-cuowu1" style={{*/}
                    {/*color:"#000",*/}
                    {/*position:"fixed",*/}
                    {/*top:"3%",*/}
                    {/*right:"5%",*/}
                    {/*display:*/}
                {/*}} onClick={()=>{this.props.history.push({pathname:"/position",state:{nm:localStorage.position}})}}></span>*/}
            </div>
        )
    }

}
export default PositionMap