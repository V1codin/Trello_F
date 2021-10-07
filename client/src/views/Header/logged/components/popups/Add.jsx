import { useContext } from "react";
import { ParentRefContext } from "../../";

import { useOuterCLick } from "../../../../../hooks/hooks";
import "./Popups.css";

function AddBoardPopup(props) {
  const { toggle, initBoardCreationForm } = props;
  const parentRef = useContext(ParentRefContext);
  useOuterCLick(parentRef, toggle);

  return (
    <section className="board_popup card_design add">
      <header className="popup__header">
        <h4 className="popup__article">Create</h4>
        <button className="popup__btn" onClick={toggle}>
          X
        </button>
      </header>
      <ul className="popup__body">
        <li>
          <button className="popup__body__el" onClick={initBoardCreationForm}>
            <span className="el__span">Create a board</span>
            <p className="el__article">
              A board is made up of cards ordered on lists. Use it to manage
              projects, track information, or organize anything.
            </p>
          </button>
        </li>
        <li>
          <button className="popup__body__el">
            <span className="el__span">Start with template</span>
            <p className="el__article">
              Get started faster with a board template.{" "}
              <span style={{ color: "var(--pink)" }}>(not implemented)</span>
            </p>
          </button>
        </li>
        <li>
          <button className="popup__body__el">
            <span className="el__span">Create a workspace</span>
            <p className="el__article">
              A Workspace is a group of boards and people. Use it to organize
              your company, side hustle, family, or friends.{" "}
              <span style={{ color: "var(--pink)" }}>(not implemented)</span>
            </p>
          </button>
        </li>
      </ul>
    </section>
  );
}

export { AddBoardPopup };
