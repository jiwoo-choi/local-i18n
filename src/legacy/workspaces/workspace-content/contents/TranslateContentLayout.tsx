import { useAppDispatch } from "@/index";
import { SwitchCase } from "@/lib/SwitchCase";
import {
  WorkspaceMode,
  useCurrentWorkspaceMode,
} from "@/legacy/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
import { TranslateCodeTransformLayout } from "@/routes/workspaces/:workspaceId/transform/TranslateCodeTransformLayout";
import { resetConditions } from "@/routes/workspaces/:workspaceId/replace/translateConditionSlice";
import { TranslateReplaceLayout } from "@/routes/workspaces/:workspaceId/replace/TranslateReplaceLayout";
import { useEffect } from "react";

export function TranslateContentLayout() {
  const { workspaceMode } = useCurrentWorkspaceMode();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetConditions());
  }, [workspaceMode, dispatch]);

  return (
    <SwitchCase
      caseBy={{
        [WorkspaceMode.DELETE]: <></>,
        [WorkspaceMode.VIEW]: <></>,
        [WorkspaceMode.MODIFY]: <TranslateReplaceLayout />,
        [WorkspaceMode.CODE_TRANSFORM]: <TranslateCodeTransformLayout />,
      }}
      value={workspaceMode}
    />
  );
}
