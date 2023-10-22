import { EntityId, EntityState, createEntityAdapter } from "@reduxjs/toolkit";
import { useId, useReducer, useState } from "react";
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type Action<T extends { entityId: EntityId }> =
  | {
      type: "add";
      payload: Omit<T, "entityId">;
    }
  | {
      type: "remove";
      payload: EntityId;
    }
  | {
      type: "update";
      payload: {
        id: EntityId;
        change: T;
      };
    };

/**
 * 자체적으로 Adatper를 사용하고 싶을 때 사용.
 * @returns
 */
export function useAdapter<T extends { entityId: EntityId }>() {
  const id = useId();
  const entityIdGenerator = (): EntityId => {
    return `${id}_id_${Date.now()}_${getRandomInt(100)}` as EntityId;
  };

  const [adapter] = useState(() => createEntityAdapter<T>());
  const [store, dispatch] = useReducer(
    (state: EntityState<T>, action: Action<T>) => {
      switch (action.type) {
        case "add":
          return adapter.addOne(state, {
            ...(action.payload as Omit<T, "entityId">),
            ...({ entityId: entityIdGenerator() } as Record<
              "entityId",
              EntityId
            >),
          } as T);
        case "remove":
          return adapter.removeOne(state, action.payload);
        case "update":
          return adapter.updateOne(state, {
            id: action.payload.id,
            changes: action.payload.change,
          });
      }
      return state;
    },
    adapter.getInitialState()
  );
  const selectors = adapter.getSelectors();
  return {
    store,
    dispatch,
    entityIdGenerator,
    ...selectors,
  };
}
