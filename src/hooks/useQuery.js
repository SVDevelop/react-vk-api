import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useVK } from "./../VK";

export default function useQuery({ method, params }) {
  const { call } = useVK();
  const [response, setResponse] = useState({
    response: {
      count: 0,
      items: []
    }
  });
  const func = useCallback(
    async (value) => {
      const { res } = await call(method, { ...params });
      const { count, items } = res;

      count &&
        setResponse((prev) => ({
          ...prev,
          response: { ...prev.response, count, items }
        }));
    },
    [call]
  );

  return func;
}

useQuery.PropTypes = {
  method: PropTypes.string.isRequired,
  params: PropTypes.object
};

useQuery.defaultProps = {
  method: "",
  params: {}
};
//  const wallGet = useCallback(
//   async (id) => {
//     const { response } = await call("wall.get", { owner_id: `-${id}` });
//     const { count, items } = response;

//     count &&
//       setWallState((prevState) => ({
//         ...prevState,
//         groups: {
//           ...groupsState.groups,
//           count,
//           chunk: items
//         }
//       }));
//   },
//   [call]
// );
