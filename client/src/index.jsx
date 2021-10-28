import ReactDOM from "react-dom";
import { StrictMode } from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import { reducer } from "./utils/main.reducer";

import { addListenersForServerChanges } from "./utils/helpers";

import "./index.css";

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
addListenersForServerChanges(store);

ReactDOM.render(
  <StrictMode>
    <Providers store={store}>
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById("root")
);
