import { useState } from "react";

import { Account } from "../../../../../components/Account";
import { AddBoardDrop } from "../dropdowns/Add";
import { InfoBoardDrop } from "../dropdowns/Info";
import { NoteBoardDrop } from "../dropdowns/Note";
import { AccountDrop } from "../dropdowns/Account";
import { AddBoardOverlay } from "../../../../../components/Overlays/AddBoards";

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
      <button
        className="menu__btn"
        name="add"
        onClick={clickHandler}
        title="Create"
      >
        <img src={plus} alt="add" className="menu__ico" name="add" />
      </button>
      {state.add ? (
        <AddBoardDrop
          toggle={() => setState({ ...defState, add: !state.add })}
          initBoardCreationForm={initBoardCreationForm}
        />
      ) : null}

      <button
        className="menu__btn"
        name="info"
        onClick={clickHandler}
        title="Information"
      >
        <img src={info} alt="info" className="menu__ico" name="info" />
      </button>
      {state.info ? (
        <InfoBoardDrop
          toggle={() => setState({ ...defState, info: !state.info })}
        />
      ) : null}

      <button
        className="menu__btn"
        name="note"
        onClick={clickHandler}
        title="Notifications"
      >
        <img src={note} alt="notification" className="menu__ico" name="note" />
      </button>
      {state.note ? (
        <NoteBoardDrop
          toggle={() => setState({ ...defState, note: !state.note })}
        />
      ) : null}

      <Account click={clickHandler} />
      {state.account ? (
        <AccountDrop
          toggle={() => setState({ ...defState, account: !state.account })}
        />
      ) : null}

      {overlay ? <AddBoardOverlay overlayHandler={setOverlay} /> : null}
    </>
  );
}

export { Menu };
