import React from "react";
import { ReactComponent as ReactLogo } from "../../assets/pulse.svg";

import "./Process.css";

function Process(props) {
  const { isShown } = props;
  const wrapperStyles = props?.styles;

  return isShown === true ? (
    <div className="wrapper" style={{ ...wrapperStyles }}>
      <div className="spinner">
        <ReactLogo />
      </div>
    </div>
  ) : null;
}

export { Process };
