// redux/store.js
import { createStore } from "redux";
import carritoReducer from "./reducer";

const store = createStore(
  carritoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
