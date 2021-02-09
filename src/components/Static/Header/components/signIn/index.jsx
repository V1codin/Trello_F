import React from "react";
import style from "./styles.module.css";
import User from "../user/";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  };
};

function LoginBlock(props) {
  const { isLogged } = props;

  if (isLogged === true) {
    return <User />;
  }

  return (
    <>
      <div className={style.auth}>
        <NavLink
          to="/auth/signIn"
          className={style.auth__control}
          activeStyle={{
            backgroundColor: "#00b566",
          }}
        >
          REGISTER
        </NavLink>
        <NavLink
          to="/auth/logIn"
          className={style.auth__control}
          activeStyle={{
            backgroundColor: "#00b566",
          }}
        >
          LOG IN
        </NavLink>
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(LoginBlock);
