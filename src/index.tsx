import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  ListenerEffectAPI,
  TypedAddListener,
  TypedStartListening,
  addListener,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import workspaceSlice from "@/workspaces/@data/workspaceSlice";
import {
  useDispatch,
  useSelector,
  Provider,
  TypedUseSelectorHook,
} from "react-redux";
import settingSlice from "@/workspaces/workspace-action/@data/settingSlice";
import translateReplaceSlice from "@/workspaces/workspace-content/contents/translate-replace/@data/translateReplaceSlice";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

export const store = configureStore({
  reducer: {
    workspaceSlice,
    settingSlice,
    translateReplaceSlice,
  },
  preloadedState:
    localStorage.getItem("lolo-test") == null
      ? undefined
      : JSON.parse(localStorage.getItem("lolo-test") ?? "{}"),
  middleware: (gDM) => gDM().prepend(listenerMiddlewareInstance.middleware),
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
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;
export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

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
