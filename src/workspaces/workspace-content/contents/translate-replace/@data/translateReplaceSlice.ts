import { AppStartListening } from "@/index";
import { LanguageKeyType } from "@/language/@data/Language";
import {
  EntityId,
  PayloadAction,
  Unsubscribe,
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

export const conditionAdapter = createEntityAdapter<ConditionType>({
  selectId: (id) => id.entityId,
});
export const conditionAdapterSelectors = conditionAdapter.getSelectors();

const translateReplaceSlice = createSlice({
  name: "translateReplaceSlice_로컬_스코프_상태지만_리덕스_유틸_활용을_이유로_만들었음",
  initialState: conditionAdapter.getInitialState(),
  reducers: {
    addCondition: (state, action: PayloadAction<ConditionType>) => {
      conditionAdapter.addOne(state, action.payload);
    },
    updateCondition: (state, action: PayloadAction<ConditionType>) => {
      conditionAdapter.updateOne(state, {
        changes: action.payload,
        id: action.payload.entityId,
      } as Update<ConditionType>);
    },
    resetConditions: () => {
      return conditionAdapter.getInitialState();
    },
    __init: () => {},
  },
});

export const { __init, resetConditions, addCondition, updateCondition } =
  translateReplaceSlice.actions;
export default translateReplaceSlice.reducer;

export function setUpTranslateReplaceSlice(
  startListening: AppStartListening
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: __init,
      effect: (action, { cancelActiveListeners, dispatch }) => {
        cancelActiveListeners();
        dispatch(resetConditions());
      },
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}
