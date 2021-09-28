import { Form } from "../../modules/form";
import { createUser } from "../../api/login.api";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./Signup.css";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

function RowSignup(props) {
  const { history, isLogged } = props;

  if (isLogged === true) return <Redirect to="/profile" />;

  const sendRequest = async (data) => {
    try {
      const res = await createUser(data);
      if (res) {
        history.push("/login");
      }
    } catch (e) {
      history.push("/error", e);
    }
  };

  return (
    <>
      <Form type="signup" callback={sendRequest} />
    </>
  );
}

const Signup = connect(mapStateToProps, null)(RowSignup);

export { Signup };
