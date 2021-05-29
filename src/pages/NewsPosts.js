import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function NewsPosts({ wallState, querytest }) {
  const { count, chunk } = wallState.groups;
  // console.log(chunk);

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
    // console.log();
    <>
      <HomeButton />
      <ul className={"wall-posts"}>
        {chunk &&
          chunk.map((chunk) => {
            //  attachments,//вложения
            //  comments,//{count: 0, can_post: 1}
            //  date,//timestemp
            //  from_id,
            //  id,
            //  is_pinned,//закреплен 1 or 0
            //  likes,//{count: 2, user_likes: 0, can_like: 1, can_publish: 1}
            //  marked_as_ads,//0 xz
            //  owner_id,//-189744361
            //  post_source,//{type: "vk"}
            //  post_type,
            //  reposts,
            //  text
            const {
              attachments,
              comments,
              date,
              from_id,
              id,
              is_pinned,
              likes,
              marked_as_ads,
              owner_id,
              post_source,
              post_type,
              reposts,
              text
            } = chunk;
            // console.log({...chunk});
            return (
              <li key={id} className={"wall-posts__item"}>
<button onClick={()=>querytest("Nature")}>fired</button>
                {parseContent(text).map((item, i) =>
                  i === 0 ? (
                    <span className="wall-posts__title">{item}</span>
                  ) : (
                    <div className="wall-posts__content">{item}</div>
                  )
                )}
                {attachments &&
                  attachments.map((item) => {
                    item.video && console.log(item.video, item.video.owner_id);

                    switch (item.type) {
                      case "video":
                        return (
                          <>
                            <video controls width="400" height="300">
                              <source src="video.mp4" type="video/mp4" />
                            </video>
                          </>
                        );

                      case "photo":
                        //Инструкции, соответствующие value2
                        return (
                          <img
                            src={item.photo.photo_130}
                            alt={item.photo.text}
                          />
                        );
                      // break;
                      case "album":
                        return null;
                      // break;
                      case "link":
                        return (
                          <a title={item.description} href={item.url}>
                            {item.title}
                          </a>
                        );
                      //Инструкции, соответствующие значению valueN
                      //statementsN
                      // break;
                      default:
                        return null;
                      //Здесь находятся инструкции, которые выполняются при отсутствии соответствующего значения
                      //statements_def
                      // break;
                    }
                  })}
              </li>
            );
          })}
      </ul>
    </>
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
// attachments: (2) [{…}, {…}]
// comments: {count: 2, can_post: 1}
// date: 1616603459
// from_id: -189744361
// id: 546
// is_pinned: 1
// likes: {count: 2, user_likes: 0, can_like: 1, can_publish: 1}
// marked_as_ads: 0
// owner_id: -189744361
// post_source: {type: "vk"}
// post_type: "post"
// reposts: {count: 2, user_reposted: 0}
// text: "Курс по ReactJS (ранний доступ)\n\nНачинаем разработку нового курса по React! Хотите получать весь учебный материал с пылу с жару, быть в курсе всего, помогать корректировать программу и тесно общаться с разработчиками программы - тогда срочно вступайте в группу раннего доступа.\n\nПодробности на сайте:\nhttps://constcode.ru/reactjs"
