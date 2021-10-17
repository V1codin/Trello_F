import {
  LIST_DELETED,
  NEW_LISTS_CREATED,
  GET_LISTS,
} from "../utils/actions.types";

/*
const init = {
  name: "",
  order: 0,
  borderId: "",
  archived: false,
};
*/

const init = [];

function lists(state = init, { type, payload }) {
  switch (type) {
    case LIST_DELETED:
      return state.filter((list) => list._id !== payload);
    case GET_LISTS:
      return [...payload];
    case NEW_LISTS_CREATED:
      return [...state, payload];
    default:
      return state;
  }
}

export { lists };
