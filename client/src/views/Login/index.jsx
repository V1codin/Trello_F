import { Redirect } from "react-router-dom";
import { useState, memo } from "react";
import { connect } from "react-redux";
import { useAsyncCallback } from "react-async-hook";
import { NavLink } from "react-router-dom";

import { FormWrapper } from "../../modules/formWrapper";
import { formValidation, inputValidation } from "../../utils/form.valination";

import { auth } from "../../api/auth.api";

import "./Login.css";

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

const FormBody = memo((props) => {
  const { warn, form, changeHandler, submit } = props;

  return (
    <>
      <h3 className="form__heading">Login</h3>
      <input
        type="text"
        name="username"
        className="form__input"
        placeholder="Enter username"
        value={form.username}
        onChange={changeHandler}
        required
        autoFocus
      />
      {warn.username ? (
        <span className="form__warning">{warn.username}</span>
      ) : null}
      <input
        type="password"
        name="password"
        className="form__input"
        data-validatefor="confirmPassword"
        placeholder="Enter password"
        value={form.password}
        onChange={changeHandler}
        required
      />
      {warn.password ? (
        <span className="form__warning">{warn.password}</span>
      ) : null}
      <button className="form__btn" onClick={submit}>
        Log in
      </button>
      <NavLink to="/signup" className="form__link">
        Sign up for an account
      </NavLink>
    </>
  );
});

function RowLogin(props) {
  const { dispatch, isLogged } = props;

  const sendRequest = async (data) => {
    try {
      await auth.login(data, dispatch);
    } catch (e) {
      throw e;
    }
  };

  const { execute, loading, error } = useAsyncCallback(sendRequest);

  const formDefault = {
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    email: "",
    className: "",
  };

  const [form, setForm] = useState(formDefault);
  const [warn, setWarn] = useState(formDefault);

  const type = "login";

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

  const submit = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const { data, isValidated } = formValidation(form, type);

    // * validation passed and there is no warnings
    if (isValidated && Object.values(warn).every((message) => message === "")) {
      execute(data);
      setForm({
        ...formDefault,
        username: form.username,
      });
    }
    return;
  };

  if (isLogged === true) return <Redirect to="/profile" />;

  const bodyProps = {
    warn,
    form,
    changeHandler,
    submit,
  };

  return (
    <div className="form__container">
      <FormWrapper form={form} error={error} loading={loading}>
        <FormBody {...bodyProps} />
      </FormWrapper>
    </div>
  );
}

const Login = connect(mapStateToProps, mapDispatchToProps)(RowLogin);

export { Login };

/*

? prev

import { Redirect } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

import { Process } from "../../modules/process";
import { Form } from "../../modules/form";
import { formValidation, inputValidation } from "../../utils/form.valination";

import { auth } from "../../api/auth.api";

import "./Login.css";

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

function RowLogin(props) {
  const { dispatch, isLogged } = props;

  const sendRequest = async (data) => {
    try {
      await auth.login(data, dispatch);
    } catch (e) {
      throw e;
    }
  };

  const { execute, loading, error } = useAsyncCallback(sendRequest);

  const formDefault = {
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    email: "",
    className: "",
  };

  const [form, setForm] = useState(formDefault);
  const [warn, setWarn] = useState(formDefault);

  const type = "login";

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

  const submit = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const { data, isValidated } = formValidation(form, type);

    // * validation passed and there is no warnings
    if (isValidated && Object.values(warn).every((message) => message === "")) {
      execute(data);
      setForm({
        ...formDefault,
        username: form.username,
      });
    }
    return;
  };

  if (isLogged === true) return <Redirect to="/profile" />;

  const formProps = {
    type,
    heading: "Login",
    btnText: "Log in",
    form,
    warn,
    changeHandler,
    submit,
    error,
  };

  return (
    <div className="form__container">
      {loading ? <Process isShown={loading} /> : <Form {...formProps} />}
    </div>
  );
}

const Login = connect(mapStateToProps, mapDispatchToProps)(RowLogin);

export { Login };
*/
