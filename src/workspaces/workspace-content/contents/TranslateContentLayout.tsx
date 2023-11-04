import { useAppDispatch } from "@/index";
import { SwitchCase } from "@/lib/SwitchCase";
import {
  WorkspaceMode,
  useCurrentWorkspaceMode,
} from "@/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
import { TranslateCodeTransformLayout } from "@/workspaces/workspace-content/contents/translate-code-transform/TranslateCodeTransformLayout";
import { reset } from "@/workspaces/workspace-content/contents/translate-replace/@data/translateConditionSlice";
import { TranslateReplaceLayout } from "@/workspaces/workspace-content/contents/translate-replace/TranslateReplaceLayout";
import { TranslateTableLayout } from "@/workspaces/workspace-content/contents/translate-table/TranslateTableLayout";
import { useEffect } from "react";

export function TranslateContentLayout() {
  const { workspaceMode } = useCurrentWorkspaceMode();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(reset());
  }, [workspaceMode, dispatch]);

  return (
    <SwitchCase
      caseBy={{
        [WorkspaceMode.DELETE]: <></>,
        [WorkspaceMode.VIEW]: <TranslateTableLayout />,
        [WorkspaceMode.MODIFY]: <TranslateReplaceLayout />,
        [WorkspaceMode.CODE_TRANSFORM]: <TranslateCodeTransformLayout />,
      }}
      value={workspaceMode}
    />
  );
}
