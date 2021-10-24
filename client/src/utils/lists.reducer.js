import {
  LIST_DELETED,
  NEW_LIST_CREATED,
  GET_LISTS,
  GET_LISTS_AND_CARDS,
} from "../utils/actions.types";

const init = [];

function lists(state = init, { type, payload, lists }) {
  switch (type) {
    case LIST_DELETED:
      return state.filter((list) => list._id !== payload);
    case GET_LISTS:
      return [...payload];
    case GET_LISTS_AND_CARDS:
      return [...lists];
    case NEW_LIST_CREATED:
      return [...state, payload];
    default:
      return state;
  }
}

export { lists };
