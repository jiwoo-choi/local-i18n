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

export type ChangeRowType = {
  entityId: EntityId;
  langKey: LanguageKeyType;
  key: string;
  originString: string;
  targetKeyword: string;
  replaceKeyword: string;
  isSelected?: boolean;
};
export const translateReplaceChangeAdapter = createEntityAdapter<ChangeRowType>(
  {
    selectId: (id) => id.entityId,
  }
);
export const translateReplaceChangeAdaterSelectors =
  translateReplaceChangeAdapter.getSelectors();

const translateReplaceChangeSlice = createSlice({
  name: "translateReplaceChangeSlice__local",
  initialState: translateReplaceChangeAdapter.getInitialState(),
  reducers: {
    updateChangesAll: (state, action: PayloadAction<ChangeRowType[]>) => {
      translateReplaceChangeAdapter.setAll(state, action.payload);
    },
    changeRowCellSelectAll: (state, action: PayloadAction<boolean>) => {
      const updates = translateReplaceChangeAdaterSelectors
        .selectAll(state)
        .map((value) => {
          return {
            id: value.entityId,
            changes: {
              ...value,
              isSelected: action.payload,
            },
          } as Update<ChangeRowType>;
        });
      translateReplaceChangeAdapter.updateMany(state, updates);
    },
    changeRowCellSelect: (
      state,
      {
        payload: { id, select },
      }: PayloadAction<{ id: EntityId; select: boolean }>
    ) => {
      const data = state.entities[id];

      translateReplaceChangeAdapter.updateOne(state, {
        id: id,
        changes: {
          ...data,
          entityId: id,
          isSelected: select,
        },
      });
    },
  },
});

export const {
  changeRowCellSelect,
  changeRowCellSelectAll,
  updateChangesAll,
  // setAllFromConditions,
} = translateReplaceChangeSlice.actions;
export default translateReplaceChangeSlice.reducer;

export function setUpTranslateReplaceSlice(
  startListening: AppStartListening
): Unsubscribe {
  const subscriptions = [
    startListening({
      predicate: (action, currentState?, originalState?) => {
        return (
          currentState?.translateConditionSlice !=
          originalState?.translateConditionSlice
        );
      },
      effect: (action, { dispatch, unsubscribe, subscribe, getState }) => {
        unsubscribe();
        // const conditionStates =
        // dispatch(setAllFromConditions(getState().translateConditionSlice));

        // Object.values(conditionEntities).reduce((memo, curr) => {
        //   if (!curr) {
        //     return memo;
        //   }
        //   if (!curr.langKey) {
        //     return memo;
        //   }
        //   if (memo[curr.langKey] == null) {
        //     memo[curr.langKey] = [];
        //   }
        //   memo[curr.langKey].push({
        //     replaceKeyword: curr?.replaceKeyword,
        //     targetKeyword: curr?.targetKeyword,
        //   });
        //   return memo;
        // }, {} as Record<LanguageKeyType, Pick<ConditionType, "replaceKeyword" | "targetKeyword">[]>);

        subscribe();
      },
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}
