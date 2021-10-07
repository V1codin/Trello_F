import { useContext } from "react";
import { ParentRefContext } from "../../";
import { connect } from "react-redux";

import { logout } from "../../../../../api/auth.api";
import { useOuterCLick } from "../../../../../hooks/hooks";

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

function RowAccountPopup(props) {
  const {
    toggle,
    dispatch,
    userInfo: { displayName, email, imageURL },
  } = props;
  const parentRef = useContext(ParentRefContext);

  useOuterCLick(parentRef, toggle);

  const logoutHandler = async () => {
    try {
      logout(dispatch);
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  return (
    <section className="board_popup card_design account">
      <header className="popup__header">
        <h4 className="popup__article">Account</h4>
        <button className="popup__btn" onClick={toggle}>
          X
        </button>
      </header>
      <ul className="popup__body body_shape">
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
      </ul>
    </section>
  );
}

const AccountPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowAccountPopup);

export { AccountPopup };
