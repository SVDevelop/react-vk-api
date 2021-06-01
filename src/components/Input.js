import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useDebounce from "../hooks/useDebounse"

export default function Input(props) {
  const { initValue, onEnter, onKeyUp = () => {}, ...datum } = props;

  const [value, setValue] = useState(initValue);

  const handler = useDebounce((value) => {
    value && onEnter(value);
  }, 1000);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const keyUpHandler = useCallback(
    (e) => {
      onKeyUp(e);

      if (e.key === "Enter") {
        onEnter(value);
      }
    },
    [onKeyUp, onEnter, value]
  );

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        const { value } = e.target;
        setValue(value);
        handler(value);
      }}
      onKeyUp={keyUpHandler}
      {...datum}
    />
  );
}

Input.propTypes = {
  initValue: PropTypes.string.isRequired,
  onEnter: PropTypes.func.isRequired
};

Input.defaultProps = {
  initValue: "",
  onEnter() {}
};
