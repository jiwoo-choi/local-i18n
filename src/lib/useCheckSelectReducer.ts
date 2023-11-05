import { EntityId, createAction } from "@reduxjs/toolkit";
import { Dispatch, useMemo, useReducer } from "react";

export const SELECT_ITEM = createAction<{ id: EntityId; select: boolean }>(
  "selectItem"
);
export const SELECT_ALL = createAction<{ select: boolean }>("selectAll");
type SelectAction =
  | ReturnType<typeof SELECT_ITEM>
  | ReturnType<typeof SELECT_ALL>;
export type SelectState = Record<EntityId, boolean>;
export type SelectDispatch = Dispatch<SelectAction>;

function reducer(state: SelectState, action: SelectAction) {
  if (SELECT_ITEM.match(action)) {
    return { ...state, [action.payload.id]: action.payload.select };
  } else if (SELECT_ALL.match(action)) {
    return Object.entries(state).reduce(
      (memo, [key, value]) => {
        memo[key] = action.payload.select;
        return memo;
      },
      { ...state }
    );
  } else {
    return state;
  }
}

export function useCheckSelectReducer(initialState: SelectState = {}) {
  const [stateMap, dispatch] = useReducer(reducer, initialState);
  const isSelectAll = useMemo(() => {
    return Object.values(stateMap).every((value) => value);
  }, [stateMap]);
  const currentSelectedIds = useMemo(() => {
    return Object.keys(stateMap).reduce((memo, key) => {
      if (stateMap[key] && stateMap[key] === true) {
        memo.push(key);
      }
      return memo;
    }, [] as EntityId[]);
  }, [stateMap]);
  return {
    dispatch,
    stateMap,
    currentSelectedIds,
    isSelectAll,
  };
}
