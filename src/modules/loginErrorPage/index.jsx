import React from "react";
import style from "./styles.module.css";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loginBtn: {
    "&:hover": {
      backgroundColor: "#476bcf",
    },
    border: "2px solid #fff",
    backgroundColor: "#1040bf",
    borderRadius: "15px",
  },
});

function ErrorLoginPage(props) {
  const { history } = props;

  const customClasses = useStyles();
  const click = () => {
    history.push("/auth/logIn");
  };

  return (
    <div className={style.container + " " + style.container__bg}>
      <h2>Oups. You have to login.</h2>
      <Button
        variant="contained"
        color="primary"
        className={customClasses.loginBtn}
        onClick={click}
      >
        Log In
      </Button>
    </div>
  );
}

export default ErrorLoginPage;
