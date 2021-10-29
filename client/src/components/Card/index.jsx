import { useState, useRef } from "react";

import { Overlay } from "../../modules/overlay";
import { EditSection } from "./EditSection";

import edit from "../../assets/edit.svg";

import "./Card.css";

function Card(props) {
  const {
    removeCard,
    card: { name },
  } = props;

  const [isOverlay, setOverlay] = useState(false);
  const spanRef = useRef(null);

  const textAreaHeight = spanRef?.current?.scrollHeight + 15;

  const saveFn = () => {
    setOverlay((prev) => !prev);
    // removeCard()
  };

  return (
    <>
      <section className="card">
        {isOverlay ? (
          <>
            <Overlay renderBody={() => null} />
            <EditSection {...{ textAreaHeight, name, saveFn }} />
          </>
        ) : (
          <>
            <span className="card__text" ref={spanRef}>
              {name}
            </span>
            <button
              className="menu__btn edit__btn"
              title="Edit the card"
              onClick={saveFn}
            >
              <img src={edit} alt="edit" className="menu__ico edit__ico" />
            </button>
          </>
        )}
      </section>
    </>
  );
}

export { Card };
