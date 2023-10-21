import {
  rowNormalizerSelectors,
  workspaceNormalizerSelectors,
} from "@/workspaces/@data/workspaceSelectors";
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
  langKey: string;
  translateKey: string;
  translateValue: string;
};

export type RowType = {
  id: EntityId;
  key: string;
  langs: Record<string, string>;
};

export type WorkspaceType = {
  id: EntityId;
  title: string;
  step: WorkspaceStep;
  contents?: {
    title: string;
    langs: string[];
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
        cell: CellType;
      }>
    ) => {
      const workspace = workspaceNormalizerSelectors.selectById(
        state.workspaces,
        workspaceId
      );
      if (!workspace) {
        return;
      }
      const row = rowNormalizerSelectors.selectById(workspace.rows, rowId);
      if (!row) {
        return;
      }
      rowNormalizer.updateOne(workspace.rows, {
        id: rowId,
        changes: {
          id: row.id,
          key: cell.translateKey,
          langs: {
            ...{ ...row.langs },
            ...{ [cell.langKey]: cell.translateValue },
          },
        },
      });
      const updateAction: Update<WorkspaceType> = {
        id: workspaceId,
        changes: workspace,
      };
      workspaceNormalizer.updateOne(state.workspaces, updateAction);
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
