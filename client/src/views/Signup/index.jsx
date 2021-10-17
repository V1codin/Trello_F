import { Redirect } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

import { Form } from "../../modules/form";
import { Process } from "../../modules/process";
import {
  formValidation,
  inputValidation,
  confirmValidation,
} from "../../utils/form.valination";

import { auth } from "../../api/auth.api";

import "./Signup.css";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

function RowSignup(props) {
  const { isLogged, dispatch } = props;

  const sendRequest = async (data) => {
    try {
      await auth.create(data, dispatch);
    } catch (e) {
      throw e;
    }
  };

  const { execute, loading, error, status } = useAsyncCallback(sendRequest);

  const formDefault = {
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    email: "",
  };

  const [form, setForm] = useState(formDefault);
  const [warn, setWarn] = useState(formDefault);
  const type = "signup";

  const changeHandler = (e) => {
    const { name, value } = e.target;

    const { message, isValidated } = inputValidation(value, name);

    // * onchange validation with toggling warnings by update local warnings state.
    // * updating local form state after
    if (!isValidated) {
      setWarn({
        ...warn,
        [name]: message,
      });
    } else {
      setWarn({
        ...warn,
        [name]: "",
      });
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const confirmBlur = (e) => {
    const {
      name,
      value,
      dataset: { validatefor },
    } = e.target;

    // * onblur validation with toggling warnings by update local warnings state.
    const { message, isValidated } = confirmValidation(
      value,
      form[validatefor]
    );

    if (!isValidated) {
      setWarn({
        ...warn,
        [name]: message,
      });
    } else {
      setWarn({
        ...warn,
        [name]: "",
      });
    }
  };

  const submit = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const { data, isValidated } = formValidation(form, type);

    // * validation passed and there is no warnings
    if (isValidated && Object.values(warn).every((message) => message === "")) {
      execute?.(data);
      setForm(formDefault);
    }
    return;
  };

  if (isLogged === true || status === "success")
    return <Redirect to="/profile" />;

  const formProps = {
    type,
    heading: "Sign up for your account",
    form,
    warn,
    changeHandler,
    submit,
    confirmBlur,
    error,
  };

  return (
    <div className="form__container">
      {loading ? <Process isShown={loading} /> : <Form {...formProps} />}
    </div>
  );
}

const Signup = connect(mapStateToProps, mapDispatchToProps)(RowSignup);

export { Signup };
