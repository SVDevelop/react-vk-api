import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LikePanel (props) {
    const {date, likes, reposts, comments} = props
    return (
        <div className="like-panel">
            <span className="like-panel__date">{date}</span>
            <span className="wrapper">
                <i className="like-panel__likes"><FontAwesomeIcon icon={['fas', 'heart']} /><b>{likes.count}</b></i>
                <i className="like-panel__retweet"><FontAwesomeIcon icon={'retweet'} /><b>{reposts.count}</b></i>
                <i className="like-panel__comments"><FontAwesomeIcon icon={'comment'} /><b>{comments.count}</b></i>
            </span>
        </div>
    )
}