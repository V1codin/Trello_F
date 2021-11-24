import { useState, useRef, memo, Children } from "react";
import { useAsyncCallback } from "react-async-hook";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { board } from "../../../api/board.api";
import { useOuterCLick } from "../../../hooks/hooks";
import { addBoardColors } from "../../../utils/constants";

import { getDataFromClipBoard } from "../../../utils/helpers";
import { STANDARD_BG } from "../../../utils/constants";

import { FormWrapper } from "../../../modules/formWrapper";
import { Overlay } from "../../../modules/overlay";

import link from "../../../assets/link.svg";

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const FormBody = memo((props) => {
  const { form, changeHandler, submit } = props;

  return (
    <>
      <h3 className="form__heading">Add board</h3>
      <input
        type="text"
        name="title"
        className="form__input"
        placeholder="Enter board title"
        value={form.title}
        onChange={changeHandler}
        required
        autoFocus
      />
      <ul className="form__colorPicker">
        {Children.toArray(
          addBoardColors.map((color) => {
            const { backgroundColor } = color;
            return (
              <li>
                <button
                  className="colorPicker__el card_design"
                  style={{ backgroundColor: backgroundColor }}
                  onClick={changeHandler}
                  value={backgroundColor}
                  name="bg"
                ></button>
              </li>
            );
          })
        )}
        <li>
          <button
            className="menu__btn card_design menu_linkBg"
            onClick={changeHandler}
            name="link"
          >
            <img
              src={link}
              alt="link bg"
              className="menu__ico"
              name="link"
              title="Get link of the background from clipboard"
            />
          </button>
        </li>
        <li>
          <input
            className="colorPicker__el card_design"
            name="bg"
            type="color"
            style={{ backgroundColor: "#ffffffb0" }}
            onChange={changeHandler}
          />
        </li>
      </ul>
      <button
        className="form__btn"
        onClick={submit}
        disabled={form.title === "" || form.title === undefined ? true : false}
      >
        Create Board
      </button>
    </>
  );
});

function RowAddBoardOverlay(props) {
  const { overlayHandler, dispatch } = props;

  const parentRef = useRef(null);

  const containerAttrs = {
    ref: parentRef,
  };

  useOuterCLick(parentRef, () => overlayHandler(false));

  const [form, setForm] = useState({
    bg: STANDARD_BG,
    title: "",
    link: "",
  });

  const submit = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (form.title !== "") {
      form.bg = form.bg || form.link;

      const result = await board.create(form, dispatch, () =>
        overlayHandler(false)
      );

      return result;
    }
  };

  const { execute, loading, error, status } = useAsyncCallback(submit);

  const changeHandler = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const { name, value } = e.target;

    if (name === "link") {
      const res = await getDataFromClipBoard();
      setForm({
        ...form,
        bg: "",
        link: res,
      });
      return;
    }

    if (form[name] !== value) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const bodyProps = { form, changeHandler, submit: execute };

  const renderBody = () => (
    <FormWrapper
      form={form}
      error={error}
      loading={loading}
      containerAttrs={containerAttrs}
    >
      {status === "success" ? (
        <Redirect to="/profile" />
      ) : (
        <FormBody {...bodyProps} />
      )}
    </FormWrapper>
  );

  return <Overlay renderBody={renderBody} />;
}

const AddBoardOverlay = connect(null, mapDispatchToProps)(RowAddBoardOverlay);

export { AddBoardOverlay };
