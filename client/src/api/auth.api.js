import { Service } from "./service.api";
import { client, userService } from "./feathers.api";

import { board } from "./board.api";
import { LOGIN_ACTION, LOGOUT_ACTION } from "../utils/actions.types";
import { STRATEGY } from "../utils/constants";

class Auth extends Service {
  login = async (loginPayload, dispatch, ...callbacks) => {
    try {
      const [payload, { data }] = await Promise.all([
        client.authenticate({
          ...loginPayload,
          strategy: STRATEGY,
        }),
        board.find(),
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
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };

  logout = async (dispatch) => {
    try {
      const res = await client.logout();

      dispatch({
        type: LOGOUT_ACTION,
      });

      return res;
    } catch (e) {
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };

  create = async (props) => {
    try {
      const res = await userService.create({ ...props, strategy: STRATEGY });

      return res;
    } catch (e) {
      const errorFromHandler = this.handleError(e);
      throw errorFromHandler;
    }
  };

  loginFromCache = async (dispatch) => {
    const token = window.localStorage.getItem("feathers-jwt");

    if (typeof token === "string" && token.length > 0) {
      try {
        const [payload, { data }] = await Promise.all([
          client.reAuthenticate(),
          board.find(),
        ]);

        dispatch({
          type: LOGIN_ACTION,
          payload,
          data,
        });
      } catch (e) {
        console.log(this.handleError(e));
      }
    }
  };
}

const auth = new Auth();

export { auth };
