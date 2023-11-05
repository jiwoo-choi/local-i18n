import { RootState } from "@/index";
import { rowNormalizer, workspaceNormalizer } from "@/globalDataSlice";
import { EntityId } from "@reduxjs/toolkit";

export const rowNormalizerSelectors = rowNormalizer.getSelectors();
export const workspaceNormalizerSelectors = workspaceNormalizer.getSelectors();

export const findByWorkspaceIdSelector =
  (workspaceId: EntityId) => (state: RootState) => {
    if (!workspaceId) {
      return undefined;
    }
    return workspaceNormalizerSelectors.selectById(
      state.globalDataSlice.workspaceList,
      workspaceId
    );
  };

export const findByRowIdSelector =
  (workspaceId: EntityId, rowId: EntityId) => (state: RootState) => {
    if (!workspaceId) {
      return undefined;
    }
    if (!rowId) {
      return undefined;
    }
    const workspace = workspaceNormalizerSelectors.selectById(
      state.globalDataSlice.workspaceList,
      workspaceId
    );
    if (!workspace) {
      return undefined;
    }
    return rowNormalizerSelectors.selectById(workspace.rows, rowId);
  };
