import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { AsideBar } from "@/routes/workspaces/:workspaceId/_asidebar/AsideBar";
import { TranslateTableLayout } from "@/routes/workspaces/:workspaceId/viewer/TranslateTableLayout";

export function Layout() {
  const { currentRowId } = useWorkspaceDetail();

  return (
    <div className="flex flex-row w-screen">
      <TranslateTableLayout />
      {currentRowId && currentRowId !== "" && (
        <>
          <div className="h-full" style={{ minWidth: 420 }}></div>
          <AsideBar />
        </>
      )}
    </div>
  );
}
