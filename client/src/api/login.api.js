import { client, userService } from "./feathers.api";
import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  PENDING_ACTION,
} from "../utils/actions.types";

const STRATEGY = "local";

const login = async (loginPayload, dispatch) => {
  try {
    dispatch({
      type: PENDING_ACTION,
    });

    const payload = await client.authenticate({
      ...loginPayload,
      strategy: STRATEGY,
    });

    dispatch({
      type: LOGIN_ACTION,
      payload,
    });

    return payload;
  } catch (e) {
    dispatch({
      type: PENDING_ACTION,
    });
    // eslint-disable-next-line
    throw { message: "Invalid username or password", errorClass: e.className };
  }
};

const logout = async (dispatch) => {
  try {
    dispatch({
      type: PENDING_ACTION,
    });
    const res = await client.logout();
    dispatch({
      type: LOGOUT_ACTION,
    });
    return res;
  } catch (e) {
    dispatch({
      type: PENDING_ACTION,
    });

    // eslint-disable-next-line
    throw { message: e.message, errorClass: e.className };
  }
};

const createUser = async (props, dispatch) => {
  props.strategy = STRATEGY;
  try {
    dispatch({
      type: PENDING_ACTION,
    });
    const res = await userService.create(props);

    dispatch({
      type: PENDING_ACTION,
    });
    return res;
  } catch (e) {
    dispatch({
      type: PENDING_ACTION,
    });
    switch (e.code) {
      case 408:
        // eslint-disable-next-line
        throw { message: "Timeout", errorClass: e.className };
      case 409:
        // eslint-disable-next-line
        throw {
          message: "User with this parameters already exists",
          errorClass: e.className,
        };
      default:
        // eslint-disable-next-line
        throw { message: "Create user error", errorClass: "" };
    }
  }
};

const cachedLogin = async (dispatch) => {
  const token = window.localStorage.getItem("feathers-jwt");

  if (typeof token === "string" && token.length > 0) {
    try {
      const payload = await client.authenticate();

      dispatch({
        type: LOGIN_ACTION,
        payload,
      });
    } catch (e) {
      console.log("No cached login");
    }
  }
};

export { login, client, createUser, userService, cachedLogin, logout };
