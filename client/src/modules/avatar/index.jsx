import Ava from "react-avatar";

import { connect } from "react-redux";
import { logout } from "../../api/login.api";

import "./Avatar.css";

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

function RowAvatar(props) {
  const { imgLink, name, dispatch } = props;

  const logoutHandler = async () => {
    try {
      logout(dispatch);
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  return (
    <>
      {imgLink === "" ? (
        <Ava
          name={name}
          className="avatar colored"
          size={40}
          onClick={logoutHandler}
        />
      ) : (
        <Ava
          src={imgLink}
          name={name}
          className="avatar"
          size={40}
          onClick={logoutHandler}
        />
      )}
    </>
  );
}

const Avatar = connect(null, mapDispatchToProps)(RowAvatar);

export { Avatar };
