import { connect } from "react-redux";
import { useAsync } from "react-async-hook";

import { auth } from "../../api/auth.api";

import { Header } from "../../components/Header";
import { Router } from "../../routes/Router";
import { Process } from "../../modules/process";

import "./App.css";

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

function RowApp(props) {
  const { dispatch } = props;

  const { loading } = useAsync(auth.loginFromCache, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="centeredContainer mt_10">
          <Process isShown={loading} />
        </div>
      ) : (
        <>
          <Header />
          <main>{<Router />}</main>
        </>
      )}
    </>
  );
}

const App = connect(null, mapDispatchToProps)(RowApp);

export { App };
