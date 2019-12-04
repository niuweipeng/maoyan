import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
import "../../assets/iconfont/iconfont.css"
import "../../assets/css/cinemaSmall/character.css"
import cinemaActionCreatore, {allCharacterShow,changeCharacterColor} from "../../store/action/cinema"
class Character extends React.Component{
    render(){
        return (
            <div style={{display:this.props.allCharacterShow?"block":"none"}} className={"character2"}>
              <div className={"charOut2"}>
                  <div className={"charTitle2"}>
                      特色功能
                  </div>
                  <div className={"charTitleList2"}>
                      {
                         this.props.service.map(k=>(
                          <div key={k.id} className={"charTitleList12"} onClick={(e)=>{
                              this.props.getServerId.call(this,k.id,e)}}>{k.name}</div>
                          ))
                      }
                  </div>
                  <div className={"charSpecial2"}>特殊厅</div>
                  <div className={"charSpeList2"}>
                      {
                         this.props.hallType.map(v=>(
                          <div key={v.id} className={"charSpeList12"} onClick={(e)=>{
                              this.props.getHallTypeId.call(this,v.id,e)}}>{v.name}</div>
                         ))
                      }
                  </div>
              </div>
              <div className={"charBtn2"}>
                    <div className={"charBtn12"} onClick={()=>{this.props.reset.call(this)}}>重置</div>
                    <div className={"charBtn12"} style={{
                        background: "#f03d37",
                        border: "1px solid #f03d37",
                        color: "#fff"
                    }} onClick={()=>{this.props.getCharById.call(this)}}>确定</div>
              </div>
            </div>
        )
    }
    componentDidMount(){
        this.props.getCharacter.call(this) //所有特色列表数据
        localStorage.hallTypeId = -1;
        localStorage.serverId = -1;
    }
}
function mapStateToProps(state) {
    return{
        allCharacterShow:state.cinemaReducer.allCharacterShow,
        hallType:state.cinemaReducer.hallType,
        service:state.cinemaReducer.service,
    }
}
function mapDispatchToProps(dispatch) {
    return{
        getCharacter(){//所有特色功能列表数据
            dispatch(cinemaActionCreatore.getCharacter.call(this))
        },
        getServerId(serviceId,e){//获取服务的Id
            for(let i=0;i<document.querySelectorAll(".charTitleList12").length;i++){//重置样式
                document.querySelectorAll(".charTitleList12")[i].style.background = "#FFF";
                document.querySelectorAll(".charTitleList12")[i].style.color = "#777";
                document.querySelectorAll(".charTitleList12")[i].style.border = "1px solid #ccc";
            }
            let etc = e.target;
            if(e.target.className !== "charTitleList12")
                etc = e.target.parentNode.parentNode;

            etc.style.background = "#fcf0f0";
            etc.style.color = "#f03d37";
            etc.style.border = "1px solid #f03d37";
             localStorage.serviceId = serviceId;
        },
        getHallTypeId(hallTypeId,e){//获取特殊厅的Id
            console.log(hallTypeId,"hallTypeId");

            for(let i=0;i<document.querySelectorAll(".charSpeList12").length;i++){//重置样式
                document.querySelectorAll(".charSpeList12")[i].style.background = "#FFF";
                document.querySelectorAll(".charSpeList12")[i].style.color = "#777";
                document.querySelectorAll(".charSpeList12")[i].style.border = "1px solid #ccc";
            }
            let etc = e.target;
            if(e.target.className !== "charSpeList12")
                etc = e.target.parentNode.parentNode;

                etc.style.background = "#fcf0f0";
                etc.style.color = "#f03d37";
                etc.style.border = "1px solid #f03d37";
            localStorage.hallType = hallTypeId;
        },
        getCharById(){//点击确定调用方法，进行页面渲染
            dispatch(allCharacterShow());//调用方法，关闭下拉组件
            dispatch(cinemaActionCreatore.getCinemaSmall.call(this,
                    {
                        serverId:localStorage.serviceId,
                        hallType:localStorage.hallType
                    }
                ))
        },
        reset(){//点击重置，重置所有样式,并清空特色功能和特色厅的所选项
            localStorage.serviceId = -1;
            localStorage.hallType = -1;
            let charSpeList1 = document.querySelectorAll(".charSpeList12")
            let charTitleList1 = document.querySelectorAll(".charTitleList12")
            for(let i=0;i<document.querySelectorAll(".charSpeList12").length;i++){//重置样式
                charSpeList1[i].style.background = "#FFF";
                charSpeList1[i].style.color = "#777";
                charSpeList1[i].style.border = "1px solid #ccc";
            }
            for(let i=0;i<document.querySelectorAll(".charTitleList12").length;i++){//重置样式
                charTitleList1[i].style.background = "#FFF";
                charTitleList1[i].style.color = "#777";
                charTitleList1[i].style.border = "1px solid #ccc";
            }
            charSpeList1[0].style.background = "#fcf0f0";
            charSpeList1[0].style.color = "#f03d37";
            charSpeList1[0].style.border = "1px solid #f03d37";
            charTitleList1[0].style.background = "#fcf0f0";
            charTitleList1[0].style.color = "#f03d37";
            charTitleList1[0].style.border = "1px solid #f03d37";
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Character);