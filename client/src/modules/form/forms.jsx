import { Children } from "react";
import { NavLink } from "react-router-dom";

import link from "../../assets/link.svg";
import colors from "./colors.json";

function FormInputs(props) {
  const { type, heading, state, warns, changeHandler, submit } = props;
  switch (type) {
    case "login":
      return (
        <>
          <h3 className="form__heading">{heading}</h3>
          <input
            type="text"
            name="username"
            className="form__input"
            placeholder="Enter username"
            value={state.username}
            onChange={changeHandler}
            required
          />
          {warns.username ? (
            <span className="form__warning">{warns.username}</span>
          ) : null}
          <input
            type="password"
            name="password"
            className="form__input"
            data-validatefor="confirmPassword"
            placeholder="Enter password"
            value={state.password}
            onChange={changeHandler}
            required
          />
          {warns.password ? (
            <span className="form__warning">{warns.password}</span>
          ) : null}

          <button className="form__btn unselectable" onClick={submit}>
            Log in
          </button>
          <NavLink to="/signup" className="form__link">
            Sign up for an account
          </NavLink>
        </>
      );

    case "signup":
      const { confirmBlur } = props;
      return (
        <>
          <h3 className="form__heading">{heading}</h3>
          <input
            type="text"
            name="username"
            className="form__input"
            placeholder="Enter username"
            value={state.username}
            onChange={changeHandler}
            required
          />
          {warns.username ? (
            <span className="form__warning">{warns.username}</span>
          ) : null}
          <input
            type="password"
            name="password"
            className="form__input"
            data-validatefor="confirmPassword"
            placeholder="Enter password"
            value={state.password}
            onChange={changeHandler}
            required
          />
          {warns.password ? (
            <span className="form__warning">{warns.password}</span>
          ) : null}

          <input
            type="password"
            name="confirmPassword"
            data-validatefor="password"
            className="form__input"
            placeholder="Confirm password"
            value={state.confirmPassword}
            onChange={changeHandler}
            onBlur={confirmBlur}
            required
          />

          {warns.confirmPassword ? (
            <span className="form__warning">{warns.confirmPassword}</span>
          ) : null}

          <input
            type="text"
            name="displayName"
            className="form__input"
            placeholder="Enter Your full name"
            value={state.displayName}
            onChange={changeHandler}
            required
          />
          {warns.displayName ? (
            <span className="form__warning">{warns.displayName}</span>
          ) : null}

          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="Enter Your Email"
            value={state.email}
            onChange={changeHandler}
            required
          />
          {warns.email ? (
            <span className="form__warning">{warns.email}</span>
          ) : null}

          <button className="form__btn unselectable" onClick={submit}>
            Sign up
          </button>
        </>
      );
    case "add_board":
      return (
        <>
          <h3 className="form__heading">{heading}</h3>
          <input
            type="text"
            name="title"
            className="form__input"
            placeholder="Enter board title"
            value={state.title}
            onChange={changeHandler}
            required
          />
          <ul className="form__colorPicker">
            {Children.toArray(
              colors.map((color) => {
                const { backgroundColor } = color;
                return (
                  <li>
                    <button
                      className="colorPicker__el card_design"
                      style={{ backgroundColor: backgroundColor }}
                      onClick={changeHandler}
                      value={backgroundColor}
                      name="bg"
                    ></button>
                  </li>
                );
              })
            )}
            <li>
              <button
                className="menu__btn card_design menu_linkBg"
                onClick={changeHandler}
                name="link"
              >
                <img
                  src={link}
                  alt="link bg"
                  className="menu__ico"
                  name="link"
                  title="Get link of the background from clipboard"
                />
              </button>
            </li>
            <li>
              <input
                className="colorPicker__el card_design"
                name="bg"
                type="color"
                style={{ backgroundColor: "#ffffffb0" }}
                onChange={changeHandler}
              />
            </li>
          </ul>
          <button
            className="form__btn unselectable"
            onClick={submit}
            disabled={
              state.title === "" || state.title === undefined ? true : false
            }
          >
            Create Board
          </button>
        </>
      );
    default:
      return null;
  }
}

export { FormInputs };

/*
 <h3 className="form__heading">
          {type === "login" ? "Login" : "Sign up for your account"}
        </h3>
        <input
          type="text"
          name="username"
          className="form__input"
          placeholder="Enter username"
          value={form.username}
          onChange={changeHandler}
          required
        />
        {warn.username ? (
          <span className="form__warning">{warn.username}</span>
        ) : null}
        <input
          type="password"
          name="password"
          className="form__input"
          data-validatefor="confirmPassword"
          placeholder="Enter password"
          value={form.password}
          onChange={changeHandler}
          required
        />
        {warn.password ? (
          <span className="form__warning">{warn.password}</span>
        ) : null}

        {type === "signup" ? (
          <input
            type="password"
            name="confirmPassword"
            data-validatefor="password"
            className="form__input"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={changeHandler}
            onBlur={confirmBlur}
            required
          />
        ) : null}
        {warn.confirmPassword ? (
          <span className="form__warning">{warn.confirmPassword}</span>
        ) : null}

        {type === "signup" ? (
          <input
            type="text"
            name="displayName"
            className="form__input"
            placeholder="Enter Your full name"
            value={form.displayName}
            onChange={changeHandler}
            required
          />
        ) : null}
        {warn.displayName ? (
          <span className="form__warning">{warn.displayName}</span>
        ) : null}

        {type === "signup" ? (
          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={changeHandler}
            required
          />
        ) : null}
        {warn.email ? (
          <span className="form__warning">{warn.email}</span>
        ) : null}

        <button className="form__btn unselectable" onClick={submit}>
          {type === "login" ? "Log in" : "Sign up"}
        </button>
        {type === "login" ? (
          <NavLink to="/signup" className="form__link">
            Sign up for an account
          </NavLink>
        ) : null}



*/
