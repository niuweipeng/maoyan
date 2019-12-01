import React from "react";
import tools from "../../filters/tools";
import { Tabs, WhiteSpace } from 'antd-mobile';
import "../../assets/css/detailCinema/detailCinema.css";

class DayAndTickets extends React.Component {

  renderContent = tab =>
    tab.plist.length > 0?tab.plist.map(v=>(
      <div className="item-outer-mb-line-b" key={v.tm}>
        <div className="item-box-flex">
          <div className="time-block">
						<div className="begin">{v.tm}</div>
						<div className="endend">19:06<span className="tuitui">散场</span></div>
				  </div>
          <div className="info-block">
						<div className="lanlan">{v.lang} {v.tp}</div>
						<div className="hallhall">{v.th}</div>
					</div>
          <div className="ticketPrice">
						<div className="sellPr">
              <span className="d">¥</span>
              <span>
                <span className="stonefont">{v.vipPrice?v.vipPrice:"80"}</span>
              </span>
            </div>
						{
              v.vipPriceName?<div className="vipPrice">
                <span className="iconicon">{v.vipPriceName}</span>
                <span className="iconNum">¥{v.vipPrice}</span>
              </div>:null
            }
						<div className="extraDesc">{v.extraDesc}</div>
					</div>
          <div className="button-block">
						<div className="button-buy">购票</div>
					</div>
        </div>
      </div>
    )):<div className="no-seat">
        <div className="movie-over"><img src={tools.movieOver()}/></div>
        <div className="movie-over-text">今日场次已映完</div>
      </div>

  constructor(){
    super();
    this.state = {
      
    }
  }
  render(){
    const arr = this.props.sendInfo.shows?this.props.sendInfo.shows.map(v=>(
      {title:v.dateShow,plist:v.plist}
    )):null
    const tabs = arr || [];
    return (
      <div>
        <WhiteSpace />
          <Tabs 
          tabs={tabs} 
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} tabBarInactiveTextColor={"#666"} tabBarActiveTextColor={"red"} 
          />}>
            {this.renderContent}
          </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}
export default DayAndTickets;