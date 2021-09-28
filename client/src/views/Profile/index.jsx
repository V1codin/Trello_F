import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

function RowProfile(props) {
  const { isLogged } = props;
  if (isLogged === false) return <Redirect to="login" />;

  return (
    <>
      <h2>IT"S GONNA BE A PROFILE!!</h2>
    </>
  );
}

const Profile = connect(mapStateToProps, null)(RowProfile);

export { Profile };
