import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useAsyncCallback } from "react-async-hook";

import { Process } from "../../modules/process";
import { Form } from "../../modules/form";
import { ErrorBlock } from "../../modules/error";

import { login } from "../../api/login.api";

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
      await login(data, dispatch);
    } catch (e) {
      throw e;
    }
  };

  const { execute, loading, error } = useAsyncCallback(sendRequest);

  if (isLogged === true) return <Redirect to="/profile" />;

  return (
    <div className="form__container">
      {error ? <ErrorBlock {...error} /> : null}
      {loading ? (
        <Process isShown={loading} />
      ) : (
        <Form type="login" callback={execute} />
      )}
    </div>
  );
}

const Login = connect(mapStateToProps, mapDispatchToProps)(RowLogin);

export { Login };
