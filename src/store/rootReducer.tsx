import { combineReducers } from "redux";
import { UserReducer } from "../features/UserReducer";

export const rootReducer = combineReducers({ User: UserReducer });
