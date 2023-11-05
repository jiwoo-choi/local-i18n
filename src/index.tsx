import globalDataSlice from "@/globalDataSlice";
import settingSlice from "@/routes/workspaces/settingSlice";
import translateConditionSlice from "@/routes/workspaces/:workspaceId/replace/translateConditionSlice";
import translateReplaceChangeSlice from "@/routes/workspaces/:workspaceId/replace/translateReplaceChangeSlice";
import {
  ListenerEffectAPI,
  TypedAddListener,
  TypedStartListening,
  addListener,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { SetUpListener } from "./lib/SetupListener";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
/**
 * Routers
 */
import { Layout as WorkspaceListLayout } from "@/routes/workspaces";
import { Layout as WorkspaceDetailLayout } from "@/routes/workspaces/:workspaceId/viewer";
import { Layout as WorkspaceCreateLayout } from "@/routes/create";
import { Layout as WorkspaceTransformLayout } from "@/routes/workspaces/:workspaceId/transform";
import { Layout as WorkspaceReplaceLayout } from "@/routes/workspaces/:workspaceId/replace";
import { Layout as WorkspaceReplaceConditionLayout } from "@/routes/workspaces/:workspaceId/replace/condition";
import {
  Layout as WorkspaceReplaceResultLayout,
  loader as workspaceReplaceResultLoader,
} from "@/routes/workspaces/:workspaceId/replace/result";
import {
  Layout as WorkspaceIdLayout,
  loader as workspaceIdLoader,
} from "@/routes/workspaces/:workspaceId";
const rootEl = document.getElementById("root") as HTMLElement;

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

export const reducers = {
  globalDataSlice,
  settingSlice,
  translateConditionSlice,
  translateReplaceChangeSlice,
};

export function createConfigureStore(preloadedState?: any) {
  return configureStore({
    reducer: reducers,
    preloadedState:
      preloadedState ?? localStorage.getItem("lolo-test") == null
        ? undefined
        : JSON.parse(localStorage.getItem("lolo-test") ?? "{}"),
    middleware: (gDM) => gDM().prepend(listenerMiddlewareInstance.middleware),
  });
}

export const store = createConfigureStore();
store.subscribe(() => {
  localStorage.setItem("lolo-test", JSON.stringify(store.getState()));
});

const router = createBrowserRouter([
  {
    path: "*",
    loader: async () => {
      return redirect("/workspaces");
    },
  },
  {
    path: "/workspaces",
    element: <WorkspaceListLayout />,
  },
  {
    path: "/create",
    element: <WorkspaceCreateLayout />,
  },
  {
    path: "/workspaces/:workspaceId",
    element: <WorkspaceIdLayout />,
    loader: workspaceIdLoader,
    children: [
      {
        index: true,
        element: <WorkspaceDetailLayout />,
      },
      {
        path: "/workspaces/:workspaceId/viewer",
        element: <WorkspaceDetailLayout />,
      },
      {
        path: "/workspaces/:workspaceId/delete",
        element: <>delete 준비 중..</>,
      },
      {
        path: "/workspaces/:workspaceId/transform",
        element: <WorkspaceTransformLayout />,
      },
      {
        path: "/workspaces/:workspaceId/replace",
        element: <WorkspaceReplaceLayout />,
        children: [
          {
            index: true,
            element: <WorkspaceReplaceConditionLayout />,
          },
          {
            path: "/workspaces/:workspaceId/replace/condition",
            element: <WorkspaceReplaceConditionLayout />,
          },
          {
            path: "/workspaces/:workspaceId/replace/result",
            element: <WorkspaceReplaceResultLayout />,
            loader: workspaceReplaceResultLoader,
          },
        ],
      },
    ],
  },
]);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;
export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

if (rootEl) {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <SetUpListener />
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}

reportWebVitals();
