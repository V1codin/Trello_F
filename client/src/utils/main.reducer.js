import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
import { boards } from "./boards.reducer";

const reducer = combineReducers({ auth, boards });

export { reducer };
