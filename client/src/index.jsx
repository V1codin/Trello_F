import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import { reducer } from "./utils/main.reducer";

import "./index.css";

import { boardsService, listsService } from "./api/feathers.api";
import {
  NEW_BOARD_CREATED,
  BOARD_DELETED,
  NEW_LISTS_CREATED,
  LIST_DELETED,
} from "./utils/actions.types";

import { App } from "./views/App";

const combineProviders = (providers) =>
  providers.reduce((Ac, Prov) => {
    return (args) => {
      const { children, ...rest } = args;
      return (
        <Ac {...rest}>
          <Prov>{children}</Prov>
        </Ac>
      );
    };
  });

const Providers = combineProviders([Provider, BrowserRouter]);

const store = createStore(reducer, composeWithDevTools());

boardsService.on("created", (payload) => {
  store.dispatch({
    type: NEW_BOARD_CREATED,
    payload,
  });
});

boardsService.on("removed", ({ _id }) => {
  store.dispatch({
    type: BOARD_DELETED,
    payload: _id,
  });
});

listsService.on("created", (payload) => {
  store.dispatch({
    type: NEW_LISTS_CREATED,
    payload,
  });
});

listsService.on("removed", ({ _id }) => {
  store.dispatch({
    type: LIST_DELETED,
    payload: _id,
  });
});

ReactDOM.render(
  <Providers store={store}>
    <App />
  </Providers>,
  document.getElementById("root")
);
