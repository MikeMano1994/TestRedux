import { createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/auth";
import {thunk} from "redux-thunk";

const middleware = [thunk];
const store = createStore(authReducer, applyMiddleware(...middleware));
export default store;