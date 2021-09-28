import { Redirect } from "react-router-dom";

import "./Error.css";

function ErrorPage(props) {
  return props?.location?.state?.message ? (
    <div className={`container error ${props?.location?.state?.errorClass}`}>
      <h2>{props.location.state.message}</h2>
    </div>
  ) : (
    <Redirect to="/profile" />
  );
}

export { ErrorPage };
