import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { auth } from "../../api/auth.api";
import { Process } from "../../modules/process";
import { useHistory } from "react-router-dom";

import { CustomUrlSearchParams } from "../../utils/helpers";

function GoogleLogin(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    const initLoginWithGoogle = async () => {
      try {
        const url = new CustomUrlSearchParams(props.location.search);
        const code = url.get("code");
        await auth.login(
          {
            strategy: "google",
            code,
          },
          dispatch
        );
      } catch (e) {
        console.log("login with google error", e);
      } finally {
        setIsLoader(() => false);
        history.push("/profile");
      }
    };

    initLoginWithGoogle();

    return () => setIsLoader(() => false);
  });
  return (
    <>
      <Process isShown={isLoader} styles={{ margin: "10% auto" }} />
    </>
  );
}

export { GoogleLogin };
