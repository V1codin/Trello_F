import { useState } from "react";

import { Account } from "../../../../../components/Account";
import { AddBoardPopup } from "../popups/Add";
import { InfoBoardPopup } from "../popups/Info";
import { NoteBoardPopup } from "../popups/Note";
import { AccountPopup } from "../popups/Account";
import { AddBoardOverlay } from "../../../../Overlays/AddBoards";

import plus from "../../../../../assets/plus.svg";
import info from "../../../../../assets/info.svg";
import note from "../../../../../assets/notification.svg";

import "./Menu.css";

function Menu(props) {
  const defState = {
    add: false,
    info: false,
    note: false,
    account: false,
  };
  const [state, setState] = useState(defState);
  const [overlay, setOverlay] = useState(false);

  const clickHandler = (e) => {
    const {
      target: { name },
    } = e;

    setState({ ...defState, [name]: !state[name] });
  };

  const initBoardCreationForm = () => {
    setOverlay(true);
    setState(defState);
  };

  return (
    <>
      <button className="menu__btn" name="add" onClick={clickHandler}>
        <img src={plus} alt="add board" className="menu__ico" name="add" />
      </button>
      {state.add ? (
        <AddBoardPopup
          toggle={() => setState({ ...defState, add: !state.add })}
          initBoardCreationForm={initBoardCreationForm}
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

      <button className="menu__btn" name="note" onClick={clickHandler}>
        <img src={note} alt="notification" className="menu__ico" name="note" />
      </button>
      {state.note ? (
        <NoteBoardPopup
          toggle={() => setState({ ...defState, note: !state.note })}
        />
      ) : null}

      <Account click={clickHandler} />
      {state.account ? (
        <AccountPopup
          toggle={() => setState({ ...defState, account: !state.account })}
        />
      ) : null}

      {overlay ? <AddBoardOverlay overlayHandler={setOverlay} /> : null}
    </>
  );
}

export { Menu };
