import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
import { boards } from "./boards.reducer";
import { card } from "./card.reducer";
import { lists } from "./lists.reducer";

const reducer = combineReducers({ auth, boards, card, lists });

export { reducer };
