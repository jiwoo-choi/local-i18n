import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import workspaceSlice from "@/workspaces/@data/workspaceSlice";
import {
  useDispatch,
  useSelector,
  Provider,
  TypedUseSelectorHook,
} from "react-redux";
import settingSlice from "@/setting/@data/settingSlice";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log(
  localStorage.getItem("lolo-test") == null
    ? undefined
    : JSON.parse(localStorage.getItem("lolo-test") ?? "{}")
);
export const store = configureStore({
  reducer: {
    workspaceSlice,
    settingSlice,
  },
  preloadedState:
    localStorage.getItem("lolo-test") == null
      ? undefined
      : JSON.parse(localStorage.getItem("lolo-test") ?? "{}"),
});
store.subscribe(() => {
  localStorage.setItem("lolo-test", JSON.stringify(store.getState()));
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// const myStore = createStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
