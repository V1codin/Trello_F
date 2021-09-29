import { Redirect } from "react-router-dom";
import { useAsyncCallback } from "react-async-hook";
import { connect } from "react-redux";

import { Form } from "../../modules/form";
import { Process } from "../../modules/process";
import { ErrorBlock } from "../../modules/error";

import { createUser } from "../../api/login.api";

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
      await createUser(data, dispatch);
    } catch (e) {
      throw e;
    }
  };

  const { execute, loading, error, status } = useAsyncCallback(sendRequest);

  if (isLogged === true || status === "success")
    return <Redirect to="/profile" />;

  return (
    <div className="form__container">
      {error ? <ErrorBlock {...error} /> : null}
      {loading ? (
        <Process isShown={loading} />
      ) : (
        <Form type="signup" callback={execute} />
      )}
    </div>
  );
}

const Signup = connect(mapStateToProps, mapDispatchToProps)(RowSignup);

export { Signup };
