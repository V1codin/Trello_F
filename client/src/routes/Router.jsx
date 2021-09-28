import { Switch, Route, Redirect } from "react-router-dom";

import { Main } from "../components/Main";
import { Login } from "../views/Login";
import { Signup } from "../views/Signup";
import { ErrorPage } from "../modules/error";
import { Profile } from "../views/Profile";

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/Profile" component={Profile} />

      <Redirect to="/" />
    </Switch>
  );
}

export { Router };
