import { CurrentWorkspaceModeProvider } from "@/legacy/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
// import { AsideBar } from "@/routes/workspaces/:workspaceId/_asidebar/AsideBar";
import { TranslateContentLayout } from "@/legacy/workspaces/workspace-content/contents/TranslateContentLayout";
import { Topbar } from "@/legacy/workspaces/workspace-content/topbar/Topbar";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";

export function WorkspaceContents() {
  return (
    <>
      {/* <CurrentRowIDProvider workspaceId={currWorkspaceId}> */}
      <Topbar />
      <div className="flex relative h-full">
        <div className="relative w-full overflow-y-scroll">
          <CurrentWorkspaceModeProvider>
            <TranslateContentLayout />
          </CurrentWorkspaceModeProvider>
        </div>
        {/* <AsideBar /> */}
      </div>
      {/* </CurrentRowIDProvider> */}
    </>
  );
}
