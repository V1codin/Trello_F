import PropTypes from "prop-types";

import { memo } from "react";

import "./Error.css";

const ErrorBlock = memo((props) => {
  const { message, errorClass } = props;

  return (
    <div className={`container error ${errorClass}`}>
      <h4>{message}</h4>
    </div>
  );
});

ErrorBlock.defaultProps = {
  message: "Unhandled Error",
  errorClass: "",
};

ErrorBlock.propTypes = {
  message: PropTypes.string.isRequired,
  errorClass: PropTypes.string.isRequired,
};

export { ErrorBlock };
