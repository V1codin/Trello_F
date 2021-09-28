import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Form } from "../../modules/form";
import { Process } from "../../modules/process";
import { createUser } from "../../api/login.api";

import "./Signup.css";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    pending: state.auth.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

function RowSignup(props) {
  const { history, isLogged, dispatch, pending } = props;

  if (isLogged === true) return <Redirect to="/profile" />;

  const sendRequest = async (data) => {
    try {
      const res = await createUser(data, dispatch);
      if (res) {
        history.push("/login");
      }
    } catch (e) {
      history.push("/error", e);
    }
  };

  return (
    <>
      {pending ? (
        <Process isShown={pending} />
      ) : (
        <Form type="signup" callback={sendRequest} />
      )}
    </>
  );
}

const Signup = connect(mapStateToProps, mapDispatchToProps)(RowSignup);

export { Signup };
