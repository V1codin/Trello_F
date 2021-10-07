import { connect } from "react-redux";
import { useAsync } from "react-async-hook";

import { cachedLogin } from "../../api/auth.api";

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

  const { loading } = useAsync(cachedLogin, [dispatch]);

  return (
    <div className="app">
      {loading ? (
        <Process isShown={loading} />
      ) : (
        <>
          <Header />
          <main>{<Router />}</main>
        </>
      )}
    </div>
  );
}

const App = connect(null, mapDispatchToProps)(RowApp);

export { App };
