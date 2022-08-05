import { Redirect } from 'react-router-dom';
import { useState, memo } from 'react';
import { connect } from 'react-redux';
import { useAsyncCallback } from 'react-async-hook';

import { FormWrapper } from '../../modules/formWrapper';

import {
  formValidation,
  inputValidation,
  confirmValidation
} from '../../utils/auth.form.validation';

// ? type for validation fn
import { authFormTypeSignup as type } from '../../utils/constants';

import { auth } from '../../api/auth.api';

import './Signup.css';

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

const FormBody = memo((props) => {
  const { confirmBlur, warn, form, changeHandler, submit } = props;

  return (
    <>
      <h3 className="form__heading">Sign up for your account</h3>
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

      {warn.confirmPassword ? (
        <span className="form__warning">{warn.confirmPassword}</span>
      ) : null}

      <input
        type="text"
        name="displayName"
        className="form__input"
        placeholder="Enter Your full name"
        value={form.displayName}
        onChange={changeHandler}
        required
      />
      {warn.displayName ? (
        <span className="form__warning">{warn.displayName}</span>
      ) : null}

      <input
        type="email"
        name="email"
        className="form__input"
        placeholder="Enter Your Email"
        value={form.email}
        onChange={changeHandler}
        required
      />
      {warn.email ? <span className="form__warning">{warn.email}</span> : null}
      <button className="form__btn" onClick={submit}>
        Sign up
      </button>
    </>
  );
});

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
    username: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    email: '',
    className: ''
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
        [name]: message
      });
    } else {
      setWarn({
        ...warn,
        [name]: ''
      });
    }

    setForm({
      ...form,
      [name]: value
    });
  };

  const confirmBlur = (e) => {
    const {
      name,
      value,
      dataset: { validatefor }
    } = e.target;

    // * onblur validation with toggling warnings by update local warnings state.
    const { message, isValidated } = confirmValidation(
      value,
      form[validatefor]
    );

    if (!isValidated) {
      setWarn({
        ...warn,
        [name]: message
      });
    } else {
      setWarn({
        ...warn,
        [name]: ''
      });
    }
  };

  const submit = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const { data, isValidated } = formValidation(form, type);

    // * validation passed and there is no warnings
    if (isValidated && Object.values(warn).every((message) => message === '')) {
      execute?.(data);
      setForm(formDefault);
    }
    return;
  };

  if (isLogged === true || status === 'success')
    return <Redirect to="/profile" />;

  const bodyProps = { confirmBlur, warn, form, changeHandler, submit };

  return (
    <div className="form__container">
      <FormWrapper form={form} error={error} loading={loading}>
        <FormBody {...bodyProps} />
      </FormWrapper>
    </div>
  );
}

const Signup = connect(mapStateToProps, mapDispatchToProps)(RowSignup);

export { Signup };
