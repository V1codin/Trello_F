import { client, userService, boardsService } from "./feathers.api";
import { LOGIN_ACTION, LOGOUT_ACTION } from "../utils/actions.types";

const STRATEGY = "local";

const login = async (loginPayload, dispatch) => {
  try {
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
    switch (e.code) {
      case 408:
        // eslint-disable-next-line
        throw { message: "Timeout", errorClass: e.className };
      default:
        // eslint-disable-next-line
        throw {
          message: "Invalid username or password",
          errorClass: e.className,
        };
    }
  }
};

const logout = async (dispatch) => {
  try {
    const res = await client.logout();
    dispatch({
      type: LOGOUT_ACTION,
    });
    return res;
  } catch (e) {
    // eslint-disable-next-line
    throw { message: e.message, errorClass: e.className };
  }
};

const createUser = async (props) => {
  props.strategy = STRATEGY;
  try {
    const res = await userService.create(props);

    return res;
  } catch (e) {
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

      /* // ? getting user's boards 
       const boards = await boardsService.find({ user: payload });
      */

      dispatch({
        type: LOGIN_ACTION,
        payload,
      });
    } catch (e) {
      console.log("No cached login");
    }
  }
};

export { login, client, createUser, cachedLogin, logout };
