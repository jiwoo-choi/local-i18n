import { Separator } from "@/components/ui/separator";
import { WorkspaceListHeader } from "@/routes/workspaces/WorkspaceListHeader";
import { WorkspaceListTable } from "@/routes/workspaces/WorkspaceListTable";
import { useState } from "react";

export function WorkspaceListLayout() {
  const [isDeleteMode, changeDeleteMode] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <WorkspaceListHeader
        isDeleteMode={isDeleteMode}
        changeDeleteMode={changeDeleteMode}
      />
      <Separator />
      <WorkspaceListTable isDeleteMode={isDeleteMode} />
    </div>
  );
}
