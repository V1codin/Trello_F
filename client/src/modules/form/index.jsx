import { memo } from "react";

import { FormInputs } from "./forms";
import { ErrorBlock } from "../error";

import "./Form.css";

const Form = memo((props) => {
  const { type, heading, form, changeHandler, submit, ...res } = props;

  const formProps = {
    type,
    heading,
    state: form,
    warns: props?.warn,
    changeHandler,
    submit,
    ...res,
  };
  const customStyle =
    props.form.bg !== ""
      ? {
          backgroundColor: props.form.bg,
        }
      : props.form.link !== ""
      ? {
          backgroundImage: `url(${props.form.link})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }
      : null;
  return (
    <>
      <form
        className="login__form card_design"
        style={customStyle}
        {...props?.containerAttrs}
      >
        {res.error ? <ErrorBlock {...res.error} /> : null}
        <FormInputs {...formProps} />
      </form>
    </>
  );
});

export { Form };

/*

? prev implementation


import { useState, memo } from "react";

import {
  formValidation,
  inputValidation,
  confirmValidation,
} from "./form.valination";

import { FormInputs } from "./forms";

import "./Form.css";

const Form = memo((props) => {
  const { type, callback, heading } = props;

  const formDefault = {
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    email: "",
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
      <form className="login__form card_design">
        <FormInputs
          {...{
            type,
            heading,
            state: form,
            warns: warn,
            changeHandler,
            submit,
            confirmBlur,
          }}
        />
      </form>
    </>
  );
});

export { Form };


*/
