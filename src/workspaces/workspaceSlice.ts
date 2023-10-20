import {
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

export const workspaceNormalizer = createEntityAdapter<WorkspaceType>({
  selectId: (workspace) => workspace.id,
});

export type WorkspaceType = {
  id: string;
  title: string;
  step?: WorkspaceStep;
  contents?: {
    title: string;
    langs: string[];
  };
  rows: RowType[];
  currentRow?: RowType;
};

export type RowType = {
  id: string;
  key: string;
  langs: Record<string, string>;
};

export interface WorkspaceState {
  workspaces: EntityState<WorkspaceType>;
  currentWorkspace: WorkspaceType | null;
}

const initialState: WorkspaceState = {
  workspaces: workspaceNormalizer.getInitialState(),
  currentWorkspace: null,
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    removeWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      workspaceNormalizer.removeOne(state.workspaces, action.payload.id);
      state.currentWorkspace = null;
    },
    goToWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      state.currentWorkspace = action.payload;
    },
    addWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      workspaceNormalizer.addOne(state.workspaces, action.payload);
      state.currentWorkspace = action.payload;
    },
    updateWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      if (state.currentWorkspace?.id !== action.payload.id) {
        return;
      }
      const updateAction: Update<WorkspaceType> = {
        id: action.payload.id,
        changes: action.payload,
      };
      workspaceNormalizer.updateOne(state.workspaces, updateAction);
      state.currentWorkspace = action.payload;
    },
    addRow: (state, action: PayloadAction<RowType>) => {
      if (!state.currentWorkspace) {
        return;
      }
      state.currentWorkspace.rows.push(action.payload);
      const updateAction: Update<WorkspaceType> = {
        id: state.currentWorkspace.id,
        changes: state.currentWorkspace,
      };
      workspaceNormalizer.updateOne(state.workspaces, updateAction);
    },
    importsRows: (state, action: PayloadAction<RowType[]>) => {
      if (!state.currentWorkspace) {
        return;
      }
      state.currentWorkspace.rows = action.payload;
      const updateAction: Update<WorkspaceType> = {
        id: state.currentWorkspace.id,
        changes: state.currentWorkspace,
      };
      workspaceNormalizer.updateOne(state.workspaces, updateAction);
    },
    clickRow: (state, action: PayloadAction<number>) => {
      if (!state.currentWorkspace) {
        return;
      }
      const id = state.currentWorkspace.rows[action.payload]?.id;
      const id2 = state.currentWorkspace.currentRow?.id;
      if (id === id2) {
        state.currentWorkspace.currentRow = undefined;
        return;
      }
      state.currentWorkspace.currentRow =
        state.currentWorkspace.rows[action.payload];
      // if (state.currentWorkspace.currentRow == action.payload) {
      //   state.currentWorkspace.currentRow = null;
      // }
    },
    updateRow: (
      state,
      action: PayloadAction<{
        index: number;
        key: string | "key";
        value: string;
      }>
    ) => {
      if (!state.currentWorkspace) {
        return;
      }
      const newLangs = { [action.payload.key]: action.payload.value };
      state.currentWorkspace.rows[action.payload.index] = {
        ...state.currentWorkspace.rows[action.payload.index],
        langs: {
          ...state.currentWorkspace.rows[action.payload.index].langs,
          ...newLangs,
        },
      };
      const updateAction: Update<WorkspaceType> = {
        id: state.currentWorkspace.id,
        changes: state.currentWorkspace,
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

export const {
  addRow,
  addWorkspace,
  goToWorkspace,
  removeWorkspace,
  updateWorkspace,
  updateRow,
  clickRow,
  importsRows,
} = workspaceSlice.actions;
export default workspaceSlice.reducer;
