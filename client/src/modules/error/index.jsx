import { memo } from "react";

import "./Error.css";

const ErrorBlock = memo((props) => {
  const { message, errorClass } = props;

  return message ? (
    <div className={`container error ${errorClass}`}>
      <h4>{message}</h4>
    </div>
  ) : null;
});

export { ErrorBlock };
