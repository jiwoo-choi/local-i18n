import { RootState } from "@/index";
import {
  rowNormalizer,
  workspaceNormalizer,
} from "@/workspaces/@data/workspaceSlice";
import { EntityId } from "@reduxjs/toolkit";

export const rowNormalizerSelectors = rowNormalizer.getSelectors();
export const workspaceNormalizerSelectors = workspaceNormalizer.getSelectors();

export const findByWorkspaceIdSelector =
  (workspaceId?: EntityId) => (state: RootState) => {
    if (!workspaceId) {
      return undefined;
    }
    return workspaceNormalizerSelectors.selectById(
      state.workspaceSlice.workspaces,
      workspaceId
    );
  };

export const findByRowIdSelector =
  (workspaceId?: EntityId, rowId?: EntityId) => (state: RootState) => {
    if (!workspaceId) {
      return undefined;
    }
    if (!rowId) {
      return undefined;
    }
    const workspace = workspaceNormalizerSelectors.selectById(
      state.workspaceSlice.workspaces,
      workspaceId
    );
    if (!workspace) {
      return;
    }
    return rowNormalizerSelectors.selectById(workspace.rows, rowId);
  };
