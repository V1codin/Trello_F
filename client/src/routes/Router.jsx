import { Switch, Route, Redirect } from "react-router-dom";

import { Board } from "../components/Board";
import { Login } from "../views/Login";
import { Signup } from "../views/Signup";
import { ErrorPage } from "../modules/error";
import { Profile } from "../views/Profile";

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Board} />
      <Route exact path="/board" component={Board} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/profile" component={Profile} />

      <Redirect to="/profile" />
    </Switch>
  );
}

export { Router };
