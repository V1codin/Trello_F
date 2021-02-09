import React from "react";
import ProfileTable from "./components/profileTable";
import ErrorLoginPage from "../../modules/loginErrorPage/";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: {
    cursor: "pointer",
    margin: 0,
    color: "#fff",
    backgroundColor: "#008000",
  },
  link: {
    color: "#25469e",
  },
  activeLink: {
    color: "#adff2f",
  },
  input: {
    "& input::placeholder": {
      color: "#295ca",
    },
    color: "#fff",
  },
  item: {
    "&:hover": {
      color: "#0d0ae4",
    },
    padding: "0.8em",
  },
});

function Profile(props) {
  const { history } = props;
  const isLogged = localStorage.getItem("isLogged");
  const customClasses = useStyles();

  if (isLogged === "false" || isLogged === null) {
    return <ErrorLoginPage history={history} />;
  }
  return <ProfileTable customClasses={customClasses} />;
}

export default Profile;
