import { NavLink } from "react-router-dom";
import { useState, memo } from "react";

import {
  formValidation,
  inputValidation,
  confirmValidation,
} from "../../utils/form.valination";

import "./Form.css";

const Form = memo((props) => {
  const { type, callback } = props;

  const formDefault = {
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  };

  const [form, setForm] = useState(formDefault);
  const [warn, setWarn] = useState(formDefault);

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
        [validatefor]: "",
      });
    }
  };

  const submit = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const { data, isValidated } = formValidation(form, type);

    // * validation passed and there is no warnings
    if (isValidated && Object.values(warn).every((message) => message === "")) {
      callback?.(data);
      setForm(formDefault);
    }
    return;
  };

  return (
    <>
      <form className="login__form container">
        <h3 className="form__heading">
          {type === "login" ? "Login" : "Sign up for your account"}
        </h3>
        <input
          type="text"
          name="username"
          className="form__input"
          placeholder="Enter username"
          value={form.username}
          onChange={changeHandler}
          required
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
          onBlur={type === "signup" ? confirmBlur : null}
          required
        />
        {warn.password ? (
          <span className="form__warning">{warn.password}</span>
        ) : null}

        {type === "signup" ? (
          <input
            type="password"
            name="confirmPassword"
            data-validatefor="password"
            className="form__input"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={changeHandler}
            onBlur={confirmBlur}
            required
          />
        ) : null}
        {warn.confirmPassword ? (
          <span className="form__warning">{warn.confirmPassword}</span>
        ) : null}

        {type === "signup" ? (
          <input
            type="text"
            name="displayName"
            className="form__input"
            placeholder="Enter Your full name"
            value={form.displayName}
            onChange={changeHandler}
            required
          />
        ) : null}
        {warn.displayName ? (
          <span className="form__warning">{warn.displayName}</span>
        ) : null}

        <button className="form__btn" onClick={submit}>
          {type === "login" ? "Log in" : "Sign up"}
        </button>
        {type === "login" ? (
          <NavLink to="/signup" className="form__link">
            Sign up for an account
          </NavLink>
        ) : null}
      </form>
    </>
  );
});

export { Form };
