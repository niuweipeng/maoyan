import React from "react";
import "../../assets/css/detailCinema/detailCinema.css";

class MovieInfo extends React.Component{
    render(){
        return(
            <>
            <div className="movie-info">
            <div className="movie-title-line-ellipsis">
                <span className="title-title">{this.props.sendInfo.nm}</span>
                <span className="grade">
                    <span>{this.props.sendInfo.sc}<span className="small">分</span></span>
                </span>
			</div>
			<div className="movie-desc-line-ellipsis">{this.props.sendInfo.desc}</div>
            </div>
            </>
        )
    }
}
export default MovieInfo;