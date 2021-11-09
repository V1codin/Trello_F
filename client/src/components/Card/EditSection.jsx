import React from "react";
import { useRef, useState } from "react";
import { useAsyncCallback } from "react-async-hook";

import { useOuterCLick } from "../../hooks/hooks";

import { Button } from "../../modules/button";

function EditSection(props) {
  const { textAreaHeight, name, toggleOverlay, removeCard, patchCard } = props;

  const [cardState, setCardState] = useState({ name, textAreaHeight });
  const parentEl = useRef(null);
  useOuterCLick(parentEl, toggleOverlay);

  const changeHandler = (e) => {
    const { value } = e.target;

    // ? 1.19 and 60 are tested values
    // ? min-height: 75px of the card
    const height = value.length > 60 ? Math.round(value.length * 1.19) : 75;

    setCardState({
      textAreaHeight: height,
      name: value,
    });
  };

  const textAreaFocus = (e) => e.target.select();

  const patchHandler = useAsyncCallback(async () => {
    const { name } = cardState;
    if (name !== "" && name !== " ") {
      await patchCard(name);
    }
  });

  return (
    <section className="edit__card" ref={parentEl}>
      <div className="edit__container">
        <textarea
          onChange={changeHandler}
          onKeyPress={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          className="card__text card_textarea"
          defaultValue={cardState.name}
          autoFocus
          onFocus={textAreaFocus}
          style={{ height: `${cardState.textAreaHeight}px` }}
        ></textarea>
        <section className="edit__controls">
          <Button
            {...{
              submit: removeCard,
              btnText: "Remove",
              loading: false,
              btnClassList: ["control__btn"],
            }}
          />
        </section>
      </div>

      <Button
        {...{
          submit: patchHandler.execute,
          btnText: "Save",
          loading: patchHandler.loading,
          classList: ["edit__submit__section"],
        }}
      />
    </section>
  );
}

export { EditSection };
