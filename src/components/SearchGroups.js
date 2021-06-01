import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

export default function SearchGroups({ state, wallGet }) {
  const [value, setValue] = useState(null)
  return (
    <ul className={"search-list"}>
      {state.groups.items.map((group) => {
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
              to={`/newsposts/${screen_name}`}
              onClick={(e) => {
                // e.preventDefault();
                wallGet(id)
              }}
            >
              <img className={"search-list__img"} src={photo_100} />
              <span className={"search-list__title"}>{name}</span>
              <span className={"search-list__title"}>{type}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}