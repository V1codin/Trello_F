import { useContext } from "react";
import { ParentRefContext } from "../../";
import { connect } from "react-redux";

import { auth } from "../../../../../api/auth.api";
import { useOuterCLick } from "../../../../../hooks/hooks";

import { DropDown } from "../../../../../modules/dropdown";
import { Avatar } from "../../../../../modules/avatar";

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user,
  };
};

const PopupBody = (props) => {
  const { imageURL, displayName, email, logoutHandler } = props;
  return (
    <>
      <li>
        <div className="popup__body__el body_row">
          <Avatar imgLink={imageURL} name={displayName} />
          <div className="account__el">
            <span className="el__span">{displayName}</span>
            <span className="span_email">{email}</span>
          </div>
        </div>
      </li>
      <li>
        <button
          className="popup__body__el btn_textAlign"
          onClick={logoutHandler}
        >
          <span className="el__span">Log out</span>
        </button>
      </li>
    </>
  );
};

function RowAccountDrop(props) {
  const { toggle, dispatch, userInfo } = props;
  const parentRef = useContext(ParentRefContext);

  useOuterCLick(parentRef, toggle);

  const logoutHandler = async () => {
    try {
      await auth.logout(dispatch);
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  const dropProps = {
    toggle,
    heading: "Account",
    className: "account",
    popupBody: PopupBody({ ...userInfo, logoutHandler }),
  };

  return <DropDown {...dropProps} />;
}
const AccountDrop = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowAccountDrop);

export { AccountDrop };
