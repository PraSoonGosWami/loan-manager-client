import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middleWares = [thunk];

if (process.env.NODE_ENV === "development") middleWares.push(logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWares))
);
