import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

export default function SearchGroups({ state, wallGet }) {
  return (
    <ul className={"search-list"}>
      {state.groups.chunk.map((group) => {
        const {
          id,
          name,
          screen_name,
          is_closed,
          type,
          photo_50,
          photo_100,
          photo_200
        } = group;
        return (
          <li className={"search-list__item"} key={id}>
            <Link
              className={"search-list__link"}
              // to={location => `${location.pathname}newsposts?${screen_name}`}
              to='/newsposts'
              // target="_blank"
              // rel="noreferrer"
              onClick={(e) => {
                // e.preventDefault();
                wallGet(id);
              }}
            >
              <img className={"search-list__img"} src={photo_100} />
              <span className={"search-list__title"}>{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}



// {id: 95810781, name: "Vue.js", screen_name: "vuejs", is_closed: 0, type: "group"…}
// id: 95810781
// name: "Vue.js"
// screen_name: "vuejs"
// is_closed: 0
// type: "group"
// is_admin: 0
// is_member: 0
// is_advertiser: 0
// photo_50: "https://sun1-56.userapi.com/s/v1/if1/JJjcOuFO09w7kjvTs1UW4c9MbVlnkppqWUVxSiF3rzi-66fzonWQ1YeUSMeZOfCGZYfSqu-i.jpg?size=50x0&quality=96&crop=11,0,222,222&ava=1"
// photo_100: "https://sun1-56.userapi.com/s/v1/if1/r5ht1OODzn69plI0VbnLYLftX5N4Yxb4Hi7OWgDOynwsOcSuYaKVbw08qAaFeWKMcCqrosWk.jpg?size=100x0&quality=96&crop=11,0,222,222&ava=1"
// photo_200: "https://sun1-56.userapi.com/s/v1/if1/LZEF2vQ7WaC0LJyrF2dliHf8NRBPiAWIHY3wOPaU2er2k1mU4fAtxy6USBSdaxJ6wFvHw2E6.jpg?size=200x0&quality=96&crop=11,0,222,222&ava=1"
