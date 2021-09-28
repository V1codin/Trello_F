import { HeaderView } from "../../views/Header";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

function RowHeader(props) {
  const {
    auth: { isLogged, user },
  } = props;

  return (
    <HeaderView
      isLogged={isLogged}
      imgLink={user?.imageURL}
      name={user?.displayName}
    />
  );
}

const Header = connect(mapStateToProps, null)(RowHeader);

export { Header };
