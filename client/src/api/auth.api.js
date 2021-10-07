import { client, userService } from "./feathers.api";

import { findBoards } from "./board.api";
import { LOGIN_ACTION, LOGOUT_ACTION } from "../utils/actions.types";
import { STRATEGY } from "../utils/constants";

const login = async (loginPayload, dispatch, ...callbacks) => {
  try {
    const [payload, { data }] = await Promise.all([
      client.authenticate({
        ...loginPayload,
        strategy: STRATEGY,
      }),
      findBoards(),
    ]);

    callbacks.forEach((cb) => {
      if (typeof cb === "function") {
        cb(payload, data);
      }
    });

    dispatch({
      type: LOGIN_ACTION,
      payload,
      data,
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
  /*
  // ! for dev

  try {
    const payload = await client.authenticate({
      strategy: "local",
      username: "qqqq",
      password: "qwe1",
    });

    const { data } = await findBoards();

    dispatch({
      type: LOGIN_ACTION,
      payload,
      data,
    });
  } catch (e) {
    console.log("auth error", e);
  }

  // ! for dev

  */

  const token = window.localStorage.getItem("feathers-jwt");

  if (typeof token === "string" && token.length > 0) {
    try {
      const [payload, { data }] = await Promise.all([
        client.authenticate(),
        findBoards(),
      ]);

      dispatch({
        type: LOGIN_ACTION,
        payload,
        data,
      });
    } catch (e) {
      console.log(e, "No cached login");
    }
  }
};

export { login, client, createUser, cachedLogin, logout };
