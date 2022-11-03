import { HeaderView } from "../../views/Header";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

function RawHeader(props) {
  const { isLogged } = props;

  return <HeaderView isLogged={isLogged} />;
}

const Header = connect(mapStateToProps, null)(RawHeader);

export { Header };
