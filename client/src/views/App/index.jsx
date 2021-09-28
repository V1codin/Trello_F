import { Header } from "../../components/Header";
import { Router } from "../../routes/Router";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main>{<Router />}</main>
    </div>
  );
}

export { App };
