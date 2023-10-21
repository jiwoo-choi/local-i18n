import { AsideBar } from "@/workspace/asidebar/AsideBar";
import { Topbar } from "@/workspace/topbar/Topbar";
import { TranslateTableLayout } from "@/workspace/translate-table/TranslateTableLayout";

export function WorkspaceContents() {
  return (
    <>
      <Topbar />
      <div className="flex relative h-full">
        <div className="relative w-full overflow-auto py-3">
          <TranslateTableLayout />
        </div>
        <AsideBar />
      </div>
    </>
  );
}
