import { useState, useRef } from "react";
import { useAsyncCallback } from "react-async-hook";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { board } from "../../../api/board.api";
import { useOuterCLick } from "../../../hooks/hooks";
import { getDataFromClipBoard } from "../../../utils/helpers";
import { STANDARD_BG } from "../../../utils/constants";

import { Process } from "../../../modules/process";

import { Form } from "../../../modules/form";

import "./Overlay.css";

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

function RowAddBoardOverlay(props) {
  const { overlayHandler, dispatch, user } = props;

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

      const result = await board.create({ user, form }, dispatch, () =>
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
      try {
        const res = await getDataFromClipBoard();

        setForm({
          ...form,
          bg: "",
          link: res,
        });
      } catch (error) {
        console.log("error: ", error);
      }
    }

    if (form[name] !== value) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const formProps = {
    type: "add_board",
    submit: execute,
    heading: "Add board",
    btnText: "Create Board",
    form,
    containerAttrs,
    changeHandler,
    error,
  };

  return (
    <section className="overlay">
      {loading && error === undefined ? (
        <Process isShown={loading} />
      ) : status === "success" ? (
        <Redirect to="/profile" />
      ) : (
        <Form {...formProps} />
      )}
    </section>
  );
}

const AddBoardOverlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowAddBoardOverlay);

export { AddBoardOverlay };
