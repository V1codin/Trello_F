import { connect } from "react-redux";

import { Avatar } from "../../modules/avatar";

const mapStateToProps = (state) => {
  return {
    displayName: state.auth.user.displayName,
    imgLink: state.auth.user.imageURL,
  };
};

function RowAccount(props) {
  const { imgLink, displayName, click } = props;

  const accountMenuToggle = (e) => {
    e.target.name = "account";
    click(e);
  };

  return (
    <>
      <button className="avatar_btn" name="account" onClick={accountMenuToggle}>
        <Avatar imgLink={imgLink} name={displayName} />
      </button>
    </>
  );
}

const Account = connect(mapStateToProps, null)(RowAccount);

export { Account };
