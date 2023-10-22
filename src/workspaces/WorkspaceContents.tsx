import { CurrentWorkspaceModeProvider } from "@/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
import { AsideBar } from "@/workspaces/workspace-content/asidebar/AsideBar";
import { TranslateContentLayout } from "@/workspaces/workspace-content/contents/TranslateContentLayout";
import { Topbar } from "@/workspaces/workspace-content/topbar/Topbar";

export function WorkspaceContents() {
  return (
    <>
      <Topbar />
      <div className="flex relative h-full">
        <div className="relative w-full overflow-y-scroll">
          <CurrentWorkspaceModeProvider>
            <TranslateContentLayout />
          </CurrentWorkspaceModeProvider>
        </div>
        <AsideBar />
      </div>
    </>
  );
}
