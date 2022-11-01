import { useRef, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { LoggedHeader } from './logged';

import './Header.css';

const HeaderView = memo((props) => {
  const { isLogged } = props;

  const loginLink = useRef(null);
  const signupLink = useRef(null);

  return (
    <header className="header unselectable">
      {/* // ? active = '' because there is class active with background color */}
      <NavLink to="/" className="header__link" activeClassName="">
        <h1 className="header__article">TrelloF</h1>
      </NavLink>
      {isLogged === false ? (
        <div className="header__log">
          <NavLink to="/login" ref={loginLink} tabIndex="-1">
            <button
              className="log__btn"
              onClick={() => loginLink.current.click()}
            >
              Log in
            </button>
          </NavLink>
          <NavLink to="/signup" ref={signupLink} tabIndex="-1">
            <button
              className="log__btn log__btn_sign"
              onClick={() => signupLink.current.click()}
            >
              Sign up
            </button>
          </NavLink>
        </div>
      ) : (
        <LoggedHeader />
      )}
    </header>
  );
});

export { HeaderView };
