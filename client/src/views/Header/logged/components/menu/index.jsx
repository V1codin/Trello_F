import { useState } from "react";

import { AddBoardPopup } from "../popups/Add";
import { InfoBoardPopup } from "../popups/Info";
import plus from "../../../../../assets/plus.svg";
import info from "../../../../../assets/info.svg";
import note from "../../../../../assets/notification.svg";

import "./Menu.css";

function Menu(props) {
  const defState = {
    add: false,
    info: false,
    note: false,
  };
  const [state, setState] = useState(defState);

  const clickHandler = (e) => {
    const {
      target: { name },
    } = e;

    setState({ ...defState, [name]: !state[name] });
  };

  return (
    <>
      <button className="menu__btn" name="add" onClick={clickHandler}>
        <img src={plus} alt="add board" className="menu__ico" name="add" />
      </button>
      {state.add ? (
        <AddBoardPopup
          toggle={() => setState({ ...defState, add: !state.add })}
        />
      ) : null}
      <button className="menu__btn" name="info" onClick={clickHandler}>
        <img src={info} alt="info" className="menu__ico" name="info" />
      </button>
      {state.info ? (
        <InfoBoardPopup
          toggle={() => setState({ ...defState, info: !state.info })}
        />
      ) : null}
      <button className="menu__btn">
        <img src={note} alt="notification" className="menu__ico" />
      </button>
    </>
  );
}

export { Menu };
