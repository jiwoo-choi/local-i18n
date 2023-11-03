import { LanguageKeyType } from "@/language/@data/Language";
import {
  EntityId,
  PayloadAction,
  Update,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export type ConditionType = {
  entityId: EntityId;
  langKey?: LanguageKeyType;
  targetKeyword?: string;
  replaceKeyword?: string;
};

export const translateConditionAdapter = createEntityAdapter<ConditionType>({
  selectId: (id) => id.entityId,
});
export const translateConditionAdapterSelectors =
  translateConditionAdapter.getSelectors();

const translateConditionSlice = createSlice({
  name: "translateConditionSlice__local",
  initialState: translateConditionAdapter.getInitialState(),
  reducers: {
    addCondition: (state, action: PayloadAction<ConditionType>) => {
      translateConditionAdapter.addOne(state, action.payload);
    },
    updateCondition: (state, action: PayloadAction<ConditionType>) => {
      translateConditionAdapter.updateOne(state, {
        changes: action.payload,
        id: action.payload.entityId,
      } as Update<ConditionType>);
    },
    removeConditions: (state, action: PayloadAction<EntityId[]>) => {
      translateConditionAdapter.removeMany(state, action);
    },
    reset: (state) => {
      const { ids, entities } = translateConditionAdapter.getInitialState();
      state.ids = ids;
      state.entities = entities;
    },
  },
});

export const {
  // __init,
  reset,
  addCondition,
  updateCondition,
  removeConditions,
} = translateConditionSlice.actions;
export default translateConditionSlice.reducer;

// export function setUpTranslateReplaceSlice(
//   startListening: AppStartListening
// ): Unsubscribe {
//   const subscriptions = [
//     // startListening({
//     //   actionCreator: __init,
//     //   effect: (action, { dispatch, unsubscribe, subscribe }) => {
//     //     unsubscribe();
//     //     alert("hadsf");
//     //     dispatch(reset());
//     //     subscribe();
//     //   },
//     // }),
//     // startListening({
//     //   actionCreator: __init_change,
//     //   effect: (action, { unsubscribe, dispatch, subscribe }) => {
//     //     unsubscribe();
//     //     dispatch(updateChangesAll(action.payload));
//     //     subscribe();
//     //   },
//     // }),
//   ];

//   return () => {
//     // subscriptions.forEach((unsubscribe) => unsubscribe());
//   };
// }
