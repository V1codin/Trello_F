import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Process } from "../../modules/process";
import { Form } from "../../modules/form";
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
    pending: state.auth.pending,
  };
};

function RowLogin(props) {
  const { history, dispatch, isLogged, pending } = props;

  if (isLogged === true) return <Redirect to="/profile" />;

  const sendRequest = async (data) => {
    try {
      await login(data, dispatch);
    } catch (e) {
      history.push("/error", e);
    }
  };

  return (
    <>
      {pending ? (
        <Process isShown={pending} />
      ) : (
        <Form type="login" callback={sendRequest} />
      )}
    </>
  );
}

const Login = connect(mapStateToProps, mapDispatchToProps)(RowLogin);

export { Login };
