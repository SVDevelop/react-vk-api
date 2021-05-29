import { useCallback, useState } from "react";

export default function useDebounce(callback, timer) {
  const [flag, setFlag] = useState(null);

  return useCallback(
    (...args) => {
      if (flag) {
        clearTimeout(flag);
      }

      const newFlag = setTimeout(() => {
        callback(...args);
        setFlag(null);
      }, timer);

      setFlag(newFlag);
    },
    [callback, timer, flag]
  );
}
