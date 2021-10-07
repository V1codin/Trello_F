import { useContext, useState } from "react";
import { ParentRefContext } from "../../";

import { useOuterCLick } from "../../../../../hooks/hooks";
import { images } from "./images";

import "./Popups.css";

function InfoBoardPopup(props) {
  const { toggle } = props;
  const parentRef = useContext(ParentRefContext);

  const [state, setState] = useState(0);

  useOuterCLick(parentRef, toggle);

  const { url, title, changeTipTitle } = images[state];

  const changeTip = () => {
    setState((prevS) => {
      if (prevS >= images.length - 1) {
        return 0;
      }
      return ++prevS;
    });
  };

  return (
    <section className="board_popup card_design">
      <header className="popup__header">
        <h4 className="popup__article">Information</h4>
        <button className="popup__btn" onClick={toggle}>
          X
        </button>
      </header>
      <ul className="popup__body body_shape">
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
      </ul>
    </section>
  );
}

export { InfoBoardPopup };
