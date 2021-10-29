import React from "react";

import { Button } from "../../modules/button";

function EditSection(props) {
  const { textAreaHeight, name, saveFn } = props;

  const textAreaFocus = (e) => e.target.select();

  return (
    <section className="edit__card">
      <div className="edit__container">
        <textarea
          className="card__text card_textarea"
          defaultValue={name}
          autoFocus
          onFocus={textAreaFocus}
          style={{ height: `${textAreaHeight}px` }}
        ></textarea>
        <section className="edit__controls">
          <button style={{ color: "white" }} onClick={saveFn}>
            BACK
          </button>
        </section>
      </div>

      <Button
        {...{
          submit: saveFn,
          btnText: "Save",
          loading: false,
          classList: ["edit__submit__section"],
        }}
      />
    </section>
  );
}

export { EditSection };
