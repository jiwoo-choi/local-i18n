import { AppStartListening } from "@/index";
import { workspaceNormalizerSelectors } from "@/workspaces/@data/workspaceSelectors";
import {
  EntityId,
  PayloadAction,
  Unsubscribe,
  createSlice,
  isAllOf,
} from "@reduxjs/toolkit";

/**
 * TBD
 * 후에 저장레이어가 생기면 사용 ㅏㄱ능성 있음.
 * Provider는 한단계 위에서 사용 ㅏㄱ능.
 *  */
const workspaceSlice = createSlice({
  name: "workspaceSlice",
  initialState: {},
  reducers: {
    goToWorkspace_internal: (state, action: PayloadAction<EntityId>) => {},
  },
});

export function setupWorkspaceListener(
  startListening: AppStartListening
): Unsubscribe {
  const listeners = [
    startListening({
      matcher: isAllOf(goToWorkspace_internal),
      effect: (
        { payload }: ReturnType<typeof goToWorkspace_internal>,
        { dispatch, getState, cancelActiveListeners }
      ) => {
        cancelActiveListeners();
        const workspace = workspaceNormalizerSelectors.selectById(
          getState().workspaceSlice.workspaces,
          payload
        );
        // workspace?.rows;

        // getState().workspaceSlice.workspaces.entities[];
      },
    }),
  ];
  return () => listeners.forEach((unsubscribe) => unsubscribe());
}

export const { goToWorkspace_internal } = workspaceSlice.actions;
export default workspaceSlice.reducer;
