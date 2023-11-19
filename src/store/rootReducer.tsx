import { combineReducers } from "redux";
import { ArticleReducer } from "../features/ArticlesReducer";
import { UserReducer } from "../features/UserReducer";

export const rootReducer = combineReducers({ User: UserReducer, Article: ArticleReducer });
