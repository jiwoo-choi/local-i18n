import { Button } from "@/components/ui/button";
import { AsideBar } from "@/workspace/asidebar/AsideBar";
import { KeyTableHeader } from "@/workspace/table/KeyTableHeader";
import { Topbar } from "@/workspace/topbar/Topbar";

export function WorkspaceContents() {
  return (
    <>
      <Topbar />
      <div className="flex relative h-full">
        <div className="relative w-full overflow-auto py-3">
          <KeyTableHeader />
        </div>
        <AsideBar />
      </div>
    </>
  );
}
