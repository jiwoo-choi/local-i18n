import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/index";
import { cn } from "@/lib/utils";
// import { useCurrentWorkspaceID } from "@/legacy/workspaces/@data/CurrentWorkspaceProvider";
import { removeWorkspace } from "@/globalDataSlice";
import { EntityId } from "@reduxjs/toolkit";
import { X } from "lucide-react";
import { FunctionComponent } from "react";

export function SidebarItem({
  renderIcon,
  workspaceId,
}: {
  renderIcon: FunctionComponent<{ cn: () => string }>;
  workspaceId: EntityId;
}) {
  const workspaces = useAppSelector(
    (state) => state.globalDataSlice.workspaceList
  );
  return null;
  // const { currWorkspaceId, goToWorkspace } = useCurrentWorkspaceID();
  // const dispatch = useAppDispatch();
  // const workspace = workspaces.entities[workspaceId];
  // const isSelect = currWorkspaceId && currWorkspaceId === workspaceId;
  // if (!workspace) {
  //   return null;
  // }
  // return (
  //   <Button
  //     variant={isSelect ? "secondary" : "ghost"}
  //     className="w-full justify-start"
  //     onClick={() => goToWorkspace(workspaceId)}
  //   >
  //     <div className="flex justify-betweens items-center w-full">
  //       <div className="w-full flex items-center truncate">
  //         {renderIcon({ cn: (...inputs) => cn("h-4 w-4 mr-2", inputs) })}
  //         <span className="w-full truncate text-left">{workspace.title}</span>
  //       </div>
  //       {isSelect && (
  //         <X
  //           className="h-3 w-3 text-red-600"
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             dispatch(removeWorkspace(workspace));
  //           }}
  //         />
  //       )}
  //     </div>
  //   </Button>
  // );
}
