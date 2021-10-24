import { Children } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { publicRoutes, authenticatedRoutes } from "./routes.js";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

function RowRouter(props) {
  const { isLogged } = props;

  return (
    <Switch>
      {isLogged === true
        ? Children.toArray(
            authenticatedRoutes.map((route) => {
              const { path, component } = route;
              return <Route exact path={path} component={component} />;
            })
          )
        : null}

      {Children.toArray(
        publicRoutes.map((route) => {
          const { path, component } = route;
          return <Route exact path={path} component={component} />;
        })
      )}
      <Redirect to="/login" />
    </Switch>
  );
}

const Router = connect(mapStateToProps, null)(RowRouter);

export { Router };
