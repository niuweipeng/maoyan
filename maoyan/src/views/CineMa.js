import  React  from "react"
import CinemaNav from "../components/CinemaNav"
import CinemaAAA from "../components/cinema/cinema"
export  default  class  Cinema extends  React.Component{
    render(){
        return(
            <div>
                <div className={"Firsttitle"}>影院</div>
                <CinemaNav></CinemaNav>
                <CinemaAAA></CinemaAAA>
            </div>
        )
    }
}