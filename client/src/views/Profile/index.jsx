import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Profile.css";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    userData: state.auth.user,
  };
};

function RowProfile(props) {
  const { isLogged, userData } = props;
  if (isLogged === false) return <Redirect to="login" />;

  return (
    <div className="card card_design profile">
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}

const Profile = connect(mapStateToProps, null)(RowProfile);

export { Profile };
