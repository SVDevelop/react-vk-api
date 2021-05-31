import React from "react";
import { Link, useHistory } from "react-router-dom";
import {Attachments, Header, LikePanel} from "../components";

export default function GroupWall ({ wallState, querytest }) {
  const { count, items } = wallState.groups;

  const timeConverter = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };
  return (
    <div className="container">
      <Header title={'Лента'} />
      <div className="content">
      <ul className={"wall-posts"}>
        {items &&
          items.map((post) => {
            const {
              attachments,
              comments,
              date,
              from_id,
              id,
              is_pinned,
              likes,
              owner_id,
              post_source,
              post_type,
              reposts,
              text
            } = post;
            if (!text) {
              return
            }
            return (
              <li key={id} className={"wall-posts__item"}>
                <div className="wall-posts__header">
                  <LikePanel 
                    date={timeConverter(date)}
                    likes={likes}
                    owner_id={owner_id}
                    reposts={reposts}
                    comments={comments}
                    post_source={post_source}
                    postText={text}
                    post_type={post_type}
                  />
                </div>
                {parseContent(text).map((text, i) =>
                  i === 0 ? (
                      <span className="wall-posts__title">{text}</span>
                  ) : (
                    <div className="wall-posts__content">{text}</div>
                  )
                )}
                {attachments &&
                  <Attachments attachments={attachments} />
                }
              </li>
            );
          })}
      </ul>
      </div>
    </div>
  );
}

function parseContent(value) {
  const arr = value.split("\n\n");

  const title = arr.splice(0, 1);
  const content = arr.splice(0).join("\n").trim();
  return [title, content];
}

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
