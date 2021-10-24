import React from "react";

function CardComponent(props) {
  const {
    removeCard,
    card: { name },
  } = props;

  return (
    <>
      <h3>{name}</h3>
      <button
        onClick={removeCard}
        className="menu__btn"
        style={{ color: "white" }}
      >
        REMOVE!
      </button>
    </>
  );
}

export { CardComponent };
