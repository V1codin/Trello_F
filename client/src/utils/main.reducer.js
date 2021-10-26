import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
import { boards } from "./boards.reducer";
import { cards } from "./cards.reducer";
import { lists } from "./lists.reducer";

const reducer = combineReducers({ auth, boards, cards, lists });

export { reducer };
