import { useCallback, useState } from "react";
import GroupWall from "./pages/GroupWall";
import useQuery from "./hooks/useQuery";
import Main from "./pages/Main";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useVK } from "./VK";

export default function App() {
  const { login, user, authenticated, call } = useVK();
  const [groupsState, setGroupsState] = useState({
    groups: {
      count: 0,
      items: []
    }
  });
  const [wallState, setWallState] = useState({
    groups: {
      count: 0,
      items: []
    }
  });
  // const [wallVisible, setWallVisible] = useState(false);

  // const showWall = () => setWallVisible(!wallVisible);

  const goupSearch = useCallback(
    async (value) => {
      const { response } = await call("groups.search", { q: value, sort: 0 });
      const { count, items } = response;
      // console.log('goupSearch', count, items);

      setGroupsState((prevState) => ({
        ...prevState,
        groups: {
          ...groupsState.groups,
          count,
          items: items
        }
      }));
    },
    [call]
  );
  const wallGet = useCallback(
    async (id) => {
      const date = await call("wall.get", { owner_id: `-${id}`, extended: 1 });
      
      if (date.error) {
        console.log('error_code: ', date.error.error_code);
        return
      }
      const { count, items } = date.response
      
      count &&
        setWallState((prevState) => ({
          ...prevState,
          groups: {
            ...groupsState.groups,
            count,
            items: items
          }
        }));

    },
    [call]
  );
  const wallSearch = useCallback(
    async (id) => {
      const { response } = await call("wall.search", { owner_id: `-${id}` });
      const { count, items } = response;

      count &&
        setWallState((prevState) => ({
          ...prevState,
          groups: {
            ...groupsState.groups,
            count,
            chunk: items
          }
        }));
    },
    [call]
  );
  // const groupsGetById = useCallback(
  //   async (group_id) => {
  //     const { response } = await call("groups.getById", { group_id });
  //     const { count, items } = response;
  //     console.log(items);

  //     // setState((state) => ({
  //     //   ...state,
  //     //   groups: {
  //     //     ...state.groups,
  //     //     count,
  //     //     chunk: items
  //     //   }
  //     // }));
  //   },
  //   [call]
  // );

  if (!authenticated) {
    return <button onClick={login}>Авторизоваться</button>;
  }


  return (
    <>
      <UserLink user={user} />
      <br />
      <Router>
        <Switch>
          <Route exact path="/" render={() => 
            <Main
              initValue={'constcode'}
              onEnter={goupSearch}
              state={groupsState}
              wallGet={wallGet}
            />} 
          />
          <Route path="/newsposts" render={() => <GroupWall wallState={wallState} /> } />
        </Switch>
      </Router>
    </>
  );
}

function UserLink(props) {
  const { user } = props;

  return (
    <>
      <div className="container"> 
        <a className="user" href={user.href} target="_blank" rel="noreferrer">
          {user.first_name} {user.last_name}
        </a>
      </div>
    </>
  );
}
