import { AppStartListening } from "@/index";
import { LanguageKeyType, LanguageType } from "@/language/Language";
import { submitChangeResult } from "@/routes/workspaces/:workspaceId/replace/translateReplaceChangeSlice";
import {
  EntityId,
  EntityState,
  PayloadAction,
  Unsubscribe,
  Update,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export enum WorkspaceStep {
  ON_BOARDING = "ON_BOARDING",
  CREATED = "CREATED",
}
export const rowNormalizer = createEntityAdapter<RowType>({
  selectId: (row) => row.id,
});

export const workspaceNormalizer = createEntityAdapter<WorkspaceType>({
  selectId: (workspace) => workspace.id,
});

export type CellType = {
  langKey?: LanguageKeyType;
  translateValue?: string;
  translateKey?: string;
};

type CellInputType =
  | {
      translateKey: string;
      langKey?: never;
      translateValue?: never;
    }
  | {
      translateKey?: never;
      langKey: LanguageKeyType;
      translateValue: string;
    };

export type RowType = {
  id: EntityId;
  key: string;
  langs: Partial<Record<LanguageKeyType, string>>;
};

export type WorkspaceType = {
  id: EntityId;
  title: string;
  step: WorkspaceStep;
  contents?: {
    title: string;
    langMeta: LanguageType[];
  };
  rows: EntityState<RowType>;
};

export interface WorkspaceState {
  workspaceList: EntityState<WorkspaceType>;
}

const initialState: WorkspaceState = {
  workspaceList: workspaceNormalizer.getInitialState(),
};

export const workspaceListSlice = createSlice({
  name: "workspaceList",
  initialState,
  reducers: {
    removeWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      workspaceNormalizer.removeOne(state.workspaceList, action.payload.id);
    },
    removeWorkspaces: (state, action: PayloadAction<EntityId[]>) => {
      workspaceNormalizer.removeMany(state.workspaceList, action.payload);
    },
    addWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      workspaceNormalizer.addOne(state.workspaceList, action.payload);
    },
    updateWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      const updateAction: Update<WorkspaceType> = {
        id: action.payload.id,
        changes: action.payload,
      };
      workspaceNormalizer.updateOne(state.workspaceList, updateAction);
    },
    addRow: (
      state,
      {
        payload: { workspaceId, row },
      }: PayloadAction<{
        workspaceId: EntityId;
        row: RowType;
      }>
    ) => {
      const workspace = state.workspaceList.entities[workspaceId];
      if (!workspace) {
        return;
      }
      rowNormalizer.addOne(workspace.rows, row);
    },
    importsRows: (
      state,
      {
        payload: { workspaceId, rows },
      }: PayloadAction<{
        workspaceId: EntityId;
        rows: RowType[];
      }>
    ) => {
      const workspace = state.workspaceList.entities[workspaceId];
      if (!workspace) {
        return;
      }
      console.log(workspace);
      rowNormalizer.addMany(workspace.rows, rows);
    },
    updateCell: (
      state,
      {
        payload: { workspaceId, rowId, cell },
      }: PayloadAction<{
        workspaceId: EntityId;
        rowId: EntityId;
        cell: CellInputType;
      }>
    ) => {
      const workspace = state.workspaceList.entities[workspaceId];
      if (!workspace) {
        return;
      }
      const row = workspace.rows.entities[rowId];
      if (!row) {
        return;
      }
      const newLangs =
        cell.langKey && cell.translateValue
          ? { ...row.langs, ...{ [cell.langKey]: cell.translateValue } }
          : { ...row.langs };
      const newTranslateKey = cell.translateKey ?? row.key;
      rowNormalizer.updateOne(workspace.rows, {
        id: rowId,
        changes: {
          id: row.id,
          key: newTranslateKey,
          langs: newLangs,
        },
      });
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(addWorkspace.fulfilled, (state, action) => {
    //   workspaceNormalizer.addOne(state.workspaces, action.payload);
    //   state.currentWorkspace = action.payload;
    // });
  },
});

export const {
  addRow,
  addWorkspace,
  removeWorkspace,
  updateWorkspace,
  updateCell,
  importsRows,
  removeWorkspaces,
} = workspaceListSlice.actions;
export default workspaceListSlice.reducer;

export function setUpWorkspaceListener(
  startListening: AppStartListening
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: submitChangeResult,
      effect: (action, { dispatch, unsubscribe, subscribe, getState }) => {
        unsubscribe();
        // const changeResult = getState().translateReplaceChangeSlice;
        // changeResult.ids.forEach((id) => {
        //   const data = changeResult.entities[id];
        //   if (data && data.isSelected === true) {
        //     const { originString, langKey, targetKeyword, replaceKeyword } =
        //       data;
        //     dispatch(
        //       updateCell({
        //         workspaceId: action.payload.workspaceId,
        //         rowId: id,
        //         cell: {
        //           langKey: langKey,
        //           translateValue: originString.replaceAll(
        //             targetKeyword,
        //             replaceKeyword
        //           ),
        //         },
        //       })
        //     );
        //   }
        // });
        subscribe();
      },
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}
