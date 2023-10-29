import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { CurrentWorkspaceModeProvider } from "@/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
import { AsideBar } from "@/workspaces/workspace-content/asidebar/AsideBar";
import { TranslateContentLayout } from "@/workspaces/workspace-content/contents/TranslateContentLayout";
import { CurrentRowIDProvider } from "@/workspaces/workspace-content/contents/translate-table/@data/CurrentRowProvider";
import { Topbar } from "@/workspaces/workspace-content/topbar/Topbar";

export function WorkspaceContents() {
  const { currWorkspaceId } = useCurrentWorkspaceID();
  return (
    <>
      <CurrentRowIDProvider workspaceId={currWorkspaceId}>
        <Topbar />
        <div className="flex relative h-full">
          <div className="relative w-full overflow-y-scroll">
            <CurrentWorkspaceModeProvider>
              <TranslateContentLayout />
            </CurrentWorkspaceModeProvider>
          </div>
          <AsideBar />
        </div>
      </CurrentRowIDProvider>
    </>
  );
}
