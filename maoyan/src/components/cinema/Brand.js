import React from "react";
import {
    Link
} from "react-router-dom";
import {
    connect
} from "react-redux"
import "../../assets/iconfont/iconfont.css"
import "../../assets/css/cinema/brand.css"
import cinemaActionCreatore, {allBrandShow, changeBrandName} from "../../store/action/cinema"
import Tools from "../../filters/tools";
class Brand extends React.Component{
    render(){
        return (
           <div style={{display:this.props.allBrandShow?"block":"none"}} className={"brand"}>
            <div className={"brandOut"}>
                {
                    this.props.brand.map(v=>(
                        <div key={v.id} className={"brandIn"} onClick={()=>{this.props.getBrandById.call(this,v.id,v.name)}}>
                            <div className={"brandInLeft"}>
                                <span style={{
                                    opacity:v.id===-1?"1":"0"
                                }} className="iconfont icon-duigou"></span>
                                <span className={"brandInLeftRight"}>{v.name}</span>
                            </div>
                            <div className={"brandInRight"}>{v.count}</div>
                        </div>
                    ))
                }
            </div>
           </div>
        )
    }
    componentDidMount(){
       this.props.getBrand.call(this) //所有品牌列表数据
    }
}
function mapStateToProps(state) {
    return{
        allBrandShow:state.cinemaReducer.allBrandShow,//下拉组件是否显示
        brand:state.cinemaReducer.brand,//所有品牌影院数据
    }
}
function mapDispatchToProps(dispatch) {
    return{
        getBrand(){//所有品牌列表数据
            dispatch(cinemaActionCreatore.getBrand.call(this))
        },
        //调用方法，传递影城品牌id和影城品牌名(用于改变箭头名称显示)，获取数据
        getBrandById(Id,detaiBrandName){
            localStorage.brandId = Id;
            dispatch(allBrandShow());//调用方法，关闭下拉组件
            dispatch(changeBrandName(detaiBrandName))//调用方法，改变箭头的文字提示
            dispatch(cinemaActionCreatore.getCinema.call(this,
                    {
                        brandId:Id
                    }
                 ))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Brand);