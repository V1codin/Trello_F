import { useRef, memo } from "react";
import { NavLink } from "react-router-dom";
import { LoggedHeader } from "./logged";

import "./Header.css";

const HeaderView = memo((props) => {
  const { isLogged } = props;

  const loginLink = useRef(null);
  const signupLink = useRef(null);

  return (
    <header className="header unselectable">
      <NavLink to="/" className="header__link">
        <h1 className="header__article">TrelloF</h1>
      </NavLink>
      <section className="header__boardInfo"></section>
      {isLogged === false ? (
        <div className="header__log">
          <NavLink to="/login" className="log__link" ref={loginLink}></NavLink>
          <button
            className="log__btn"
            onClick={() => loginLink.current.click()}
          >
            Log in
          </button>
          <NavLink
            to="/signup"
            className="log__link"
            ref={signupLink}
          ></NavLink>
          <button
            className="log__btn log__btn_sign"
            onClick={() => signupLink.current.click()}
          >
            Sign up
          </button>
        </div>
      ) : (
        <LoggedHeader />
      )}
    </header>
  );
});

export { HeaderView };
