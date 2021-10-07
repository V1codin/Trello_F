import { useContext } from "react";
import { ParentRefContext } from "../../";

import { useOuterCLick } from "../../../../../hooks/hooks";

function NoteBoardPopup(props) {
  const { toggle } = props;
  const parentRef = useContext(ParentRefContext);

  useOuterCLick(parentRef, toggle);

  return (
    <section className="board_popup card_design note">
      <header className="popup__header">
        <h4 className="popup__article">Notifications</h4>
        <button className="popup__btn" onClick={toggle}>
          X
        </button>
      </header>
      <ul className="popup__body body_shape">
        <li>
          <div className="popup__body__el">
            <span className="el__span">
              First element of list of notifications from server
            </span>
          </div>
        </li>
      </ul>
    </section>
  );
}

export { NoteBoardPopup };
