import { LOGIN_ACTION, LOGOUT_ACTION, PENDING_ACTION } from "./actions.types";

const checker = false;
const pending = false;

const init = {
  isLogged: checker,
  pending: pending,
  accessToken: "",
  authentication: {},
  user: {
    imageURL: "",
  },
};

function auth(state = init, { type, payload }) {
  switch (type) {
    case LOGIN_ACTION:
      return {
        ...state,
        ...payload,
        isLogged: true,
        pending: false,
      };

    case LOGOUT_ACTION:
      return init;

    case PENDING_ACTION:
      return {
        ...state,
        pending: !state.pending,
      };
    default:
      return state;
  }
}

export { auth };
