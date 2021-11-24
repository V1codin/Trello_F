import React from "react";
import PropTypes from "prop-types";
import { useAsyncCallback } from "react-async-hook";

import { note } from "../../api/notification.api";

import { Button } from "../../modules/button";

import "./Note.css";

const ButtonSection = (props) => {
  const { type, submitProps, closeFn } = props;

  switch (type) {
    case "info":
      return <Button submit={closeFn} type="closeBtn" />;
    case "invite":
      return (
        <section className="note__btns">
          <Button {...submitProps} />
          <Button submit={closeFn} type="closeBtn" />
        </section>
      );

    default:
      return null;
  }
};

function Note(props) {
  const { type, text, _id } = props;

  const deleteNote = async () => {
    try {
      await note.delete(_id, null);
    } catch (e) {
      console.log("delete note error", e);
    }
  };

  const dismissNote = useAsyncCallback(deleteNote);

  const btnProps = {
    type,
    submitProps: {
      btnText: "Agree",
      btnClassList: ["btn_small"],
      submit: dismissNote.execute,
      loading: dismissNote.loading,
    },
    closeFn: dismissNote.execute,
  };

  return (
    <li className="list__body_mt5">
      <div className="note__list__el body_row jc_sb">
        <span className={`el__span note__span ${type}`}>{text}</span>
        <ButtonSection {...btnProps} />
      </div>
    </li>
  );
}

ButtonSection.defaultProps = {
  closeFn: () => null,
  submitProps: {
    submit: () => null,
    loading: false,
    btnText: "Agree",
    btnClassList: ["btn_small"],
  },
};

ButtonSection.propTypes = {
  closeFn: PropTypes.func.isRequired,
  submitProps: PropTypes.shape({
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    btnText: PropTypes.string.isRequired,
    btnClassList: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

Note.defaultProps = {
  type: "info",
  text: "Unhandled notification",
  _id: "",
};

Note.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

export { Note };
