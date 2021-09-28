import React from "react";
import { ReactComponent as ReactLogo } from "../../assets/pulse.svg";

import "./Process.css";

function Process(props) {
  const { isShown } = props;

  return isShown === true ? (
    <div className="wrapper">
      <div className="spinner">
        <ReactLogo />
      </div>
    </div>
  ) : null;
}

export { Process };
