import { CreateLoad } from "./operation/CreateLoad";
import { CreateSave } from "@/workspace/topbar/operation/save/CreateSave";

export function Topbar() {
  return (
    <div className="sticky top-0 w-full border-b z-40 bg-background pr-7 pt-2.5 h-[63px] shadow-sm">
      <div className="flex justify-between items-center">
        <div></div>
        <div className="flex items-center space-x-3">
          {/* <Button variant={"outline"} className="shadow-md">
            불러오기
          </Button> */}
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
