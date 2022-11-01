import { Service } from './service.api';
import { client, userService } from './feathers.api';

import { board } from './board.api';
import { note } from './notification.api';

import { LOGIN_ACTION, LOGOUT_ACTION } from '../utils/actions.types';
import { STRATEGY, GOOGLE_STRATEGY } from '../utils/constants';

class Auth extends Service {
  login = async (loginPayload, dispatch, ...callbacks) => {
    try {
      const [payload, boards, notes] = await Promise.all([
        client.authenticate({
          strategy: STRATEGY,
          ...loginPayload,
        }),
        board.find(),
        note.find(),
      ]);

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(payload, boards.data);
        }
      });

      dispatch({
        type: LOGIN_ACTION,
        payload,
        boards: boards.data,
        notes: notes.data,
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
    const token = window.localStorage.getItem('feathers-jwt');

    if (typeof token === 'string' && token.length > 0) {
      try {
        const [payload, boards, notes] = await Promise.all([
          client.reAuthenticate(),
          board.find(),
          note.find(),
        ]);

        dispatch({
          type: LOGIN_ACTION,
          payload,
          boards: boards.data,
          notes: notes.data,
        });
      } catch (e) {
        console.log(this.handleError(e));
      }
    }
  };

  getBoardMembersInfo = async (arr = [], ...callbacks) => {
    try {
      const { data } = await userService.find({ query: { _id: { $in: arr } } });

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(data);
        }
      });

      return data;
    } catch (e) {
      const errorFromHandler = this.handleError(e);
      throw errorFromHandler;
    }
  };

  getUsersFromRegex = async (regex = '', ...callbacks) => {
    try {
      const { data } = await userService.find({
        query: { nameAlias: { $regex: regex, $options: 'gi' } },
      });

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(data);
        }
      });

      return data;
    } catch (e) {
      const errorFromHandler = this.handleError(e);
      throw errorFromHandler;
    }
  };
}

class GoogleAuth extends Auth {
  login = async (loginPayload, dispatch, ...callbacks) => {
    try {
      const response = await client.authenticate({
        strategy: GOOGLE_STRATEGY,
        ...loginPayload,
      });

      const payload = '1';
      console.log('response: ', response);

      dispatch();

      return payload;
    } catch (e) {
      console.log('e: ', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
}

const auth = new Auth();
const googleAuth = new GoogleAuth();

export { auth, googleAuth };
