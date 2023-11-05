import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/index";
import { SidebarItem } from "@/legacy/workspaces/sidebar/SidebarItem";
import { WorkspaceStep, addWorkspace, rowNormalizer } from "@/globalDataSlice";
import { Layers, Plus } from "lucide-react";

export function Sidebar() {
  const workspaces = useAppSelector(
    (state) => state.globalDataSlice.workspaceList
  );
  const dispatch = useAppDispatch();

  // const { goToWorkspace } = useCurrentWorkspaceID();

  return (
    <>
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        Workspaces
      </h2>
      {workspaces.ids.map((value, index) => {
        return (
          <SidebarItem
            key={`${value.toString()}_${index}`}
            workspaceId={value}
            renderIcon={({ cn }) => {
              return <Layers className={cn()} />;
            }}
          />
        );
      })}
      <Button
        variant={"ghost"}
        className="w-full justify-start"
        onClick={() => {
          const newData = {
            title: "무제 Untitled",
            id: Date.now().toString(),
            step: WorkspaceStep.ON_BOARDING,
            rows: rowNormalizer.getInitialState(),
          };
          dispatch(addWorkspace(newData));
          // goToWorkspace(newData.id);
        }}
      >
        <Plus className={"h-4 w-4"} />
        워크스페이스 추가하기
      </Button>
    </>
  );
}
