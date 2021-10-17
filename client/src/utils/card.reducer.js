// import { LOGIN_ACTION } from "./actions.types";

const init = [];

function card(state = init, { type, payload, cards }) {
  switch (type) {
    /*
    case LOGIN_ACTION:
      return [...state, ...cards];
      */
    default:
      return state;
  }
}

export { card };
