import { useContext, useState } from "react";
import { ParentRefContext } from "../../";

import { useOuterCLick } from "../../../../../hooks/hooks";

import { DropDown } from "../../../../../modules/dropdown";
import { images } from "./images";

import "./Popups.css";

const PopupBody = (props) => {
  const { url, changeTip, title, changeTipTitle } = props;
  return (
    <>
      <li>
        <div className="popup__body__el">
          <img
            src={url}
            alt="info"
            className="info__image card_design"
            onClick={changeTip}
          />
        </div>
      </li>
      <li>
        <span className="el__span">{title}</span>
      </li>
      <li>
        <button className="popup__body__el" onClick={changeTip}>
          <span className="el__span">{changeTipTitle}</span>
        </button>
      </li>
    </>
  );
};

function InfoBoardPopup(props) {
  const { toggle } = props;
  const parentRef = useContext(ParentRefContext);

  const [state, setState] = useState(0);

  useOuterCLick(parentRef, toggle);

  const changeTip = () => {
    setState((prevS) => {
      if (prevS >= images.length - 1) {
        return 0;
      }
      return ++prevS;
    });
  };

  const dropProps = {
    toggle,
    heading: "Information",
    popupBody: PopupBody({ ...images[state], changeTip }),
  };

  return <DropDown {...dropProps} />;
}

export { InfoBoardPopup };
