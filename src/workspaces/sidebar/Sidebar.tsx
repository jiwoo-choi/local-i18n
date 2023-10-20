import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/index";
import { SidebarItem } from "@/workspaces/sidebar/SidebarItem";
import {
  WorkspaceStep,
  addWorkspace,
  updateWorkspace,
} from "@/workspaces/workspaceSlice";
import { Layers, Plus } from "lucide-react";

export function Sidebar() {
  const workspaces = useAppSelector((state) => state.workspaceSlice.workspaces);
  const dispatch = useAppDispatch();

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
            rows: [],
          };
          dispatch(addWorkspace(newData));
        }}
      >
        <Plus className={"h-4 w-4"} />
        워크스페이스 추가하기
      </Button>
    </>
  );
}
