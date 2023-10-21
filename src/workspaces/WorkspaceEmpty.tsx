import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/index";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import {
  WorkspaceStep,
  addWorkspace,
  rowNormalizer,
} from "@/workspaces/@data/workspaceSlice";
import { Plus } from "lucide-react";
import { useEffect } from "react";

export function WorkspaceEmpty() {
  const workspace = useAppSelector((state) => state.workspaceSlice.workspaces);
  const dispatch = useAppDispatch();
  const { goToWorkspace } = useCurrentWorkspaceID();
  useEffect(() => {
    const work = workspace.entities[workspace.ids[0]];
    if (!work) {
      return;
    }
    goToWorkspace(workspace.ids[0]);
  }, [workspace, goToWorkspace]);
  if (workspace.ids.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-center grid space-y-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:leading-[1.1] hidden md:block">
            워크스페이스가 없습니다.
          </h1>
          <span className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            새로운 워크스페이스를 추가해보세요.
          </span>
          <Button
            onClick={() =>
              dispatch(
                addWorkspace({
                  title: "무제 Untitled",
                  id: Date.now().toString(),
                  rows: rowNormalizer.getInitialState(),
                  step: WorkspaceStep.ON_BOARDING,
                })
              )
            }
          >
            <Plus className="h-4 w-4 mr-1" />
            추가하기
          </Button>
        </div>
      </div>
    );
  }
  return null;
}
