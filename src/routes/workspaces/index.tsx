import { useAppSelector } from "@/index";
import { WorkspaceListLayout } from "@/routes/workspaces/WorkspaceListLayout";
import { WorkspaceListEmpty } from "@/routes/workspaces/WorkspaceListEmpty";

export function Layout() {
  const workspaces = useAppSelector(
    (state) => state.globalDataSlice.workspaceList
  );

  return (
    <div className="p-6">
      {workspaces.ids.length === 0 ? (
        <WorkspaceListEmpty />
      ) : (
        <WorkspaceListLayout />
      )}
    </div>
  );
}
