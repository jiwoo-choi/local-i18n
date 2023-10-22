import { WorkspaceSetting } from "@/workspaces/workspace-action/setting/WorkspaceSetting";
import { CreateSave } from "@/workspaces/workspace-action/operation/save/CreateSave";
import { CreateLoad } from "../../workspace-action/operation/CreateLoad";

export function Topbar() {
  return (
    <div className="sticky top-0 w-full border-b z-40 bg-background p-3 pt-2.5 h-[63px] shadow-sm">
      <div className="flex justify-between items-center">
        <div></div>
        <div className="flex items-center space-x-3">
          <WorkspaceSetting />
          <CreateLoad />
          <CreateSave />
          {/* <Button
            variant={"default"}
            className="shadow-lg"
            onClick={() => downloadJson("123")}
          >
            내보내기
          </Button> */}
        </div>
      </div>
    </div>
  );
}
