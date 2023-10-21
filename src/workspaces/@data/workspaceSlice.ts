import { startAppListening } from "@/index";
import { LanguageKeyType, LanguageType } from "@/language/@data/Language";
import {
  EntityId,
  EntityState,
  PayloadAction,
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
  workspaces: EntityState<WorkspaceType>;
}

const initialState: WorkspaceState = {
  workspaces: workspaceNormalizer.getInitialState(),
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    removeWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      workspaceNormalizer.removeOne(state.workspaces, action.payload.id);
    },
    addWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      workspaceNormalizer.addOne(state.workspaces, action.payload);
    },
    updateWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      const updateAction: Update<WorkspaceType> = {
        id: action.payload.id,
        changes: action.payload,
      };
      workspaceNormalizer.updateOne(state.workspaces, updateAction);
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
      const workspace = state.workspaces.entities[workspaceId];
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
      const workspace = state.workspaces.entities[workspaceId];
      if (!workspace) {
        return;
      }
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
      const workspace = state.workspaces.entities[workspaceId];
      if (!workspace) {
        return;
      }
      if (!workspace) {
        return;
      }
      const row = workspace.rows.entities[rowId];
      if (!row) {
        return;
      }
      const newLangs =
        cell.langKey && cell.translateValue
          ? { [cell.langKey]: cell.translateValue }
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

// TODO: currentWorkspace와 분리하기.
// TODO: current는 Redux가 아닌 Context로 관리되어야함. (구독 필요없음.)
export const {
  addRow,
  addWorkspace,
  // goToWorkspace,
  removeWorkspace,
  updateWorkspace,
  updateCell,
  // clickRow,
  importsRows,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
