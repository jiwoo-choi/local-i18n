import {
  WorkspaceMode,
  useCurrentWorkspaceMode,
} from "@/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
import { CurrentRowIDProvider } from "@/workspaces/workspace-content/contents/translate-table/@data/CurrentRowProvider";
import { TranslateReplaceLayout } from "@/workspaces/workspace-content/contents/translate-replace/TranslateReplaceLayout";
import { TranslateTableLayout } from "@/workspaces/workspace-content/contents/translate-table/TranslateTableLayout";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";

export function TranslateContentLayout() {
  const { workspaceMode } = useCurrentWorkspaceMode();
  const { currWorkspaceId } = useCurrentWorkspaceID();

  switch (workspaceMode) {
    case WorkspaceMode.VIEW:
      return (
        <CurrentRowIDProvider workspaceId={currWorkspaceId}>
          <TranslateTableLayout />
        </CurrentRowIDProvider>
      );
    case WorkspaceMode.MODIFY:
      return <TranslateReplaceLayout />;
    case WorkspaceMode.DELETE:
      return <div></div>;
  }
}
