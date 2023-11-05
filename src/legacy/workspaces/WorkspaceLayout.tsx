import { WorkspaceStep } from "@/globalDataSlice";
import { WorkspaceContents } from "@/legacy/workspaces/WorkspaceContents";
// import { WorkspaceOnBoarding } from "@/workspace-create/WorkspaceCreate";
import { Sidebar } from "@/legacy/workspaces/sidebar/Sidebar";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";

{
  /** cols로 하는 방식들은 대응해야할게 많음. grid는 동적 컨트롤 하기 좋으니 후에 고려 */
}

export function WorkspaceLayout() {
  const { workspace, workspaceId } = useWorkspaceDetail();
  return (
    <div
      className="flex relative "
      style={{ height: "calc(100vh)" }}
      id="all-cols"
    >
      <div
        id="layout"
        className="fixed h-full z-20 py-6 px-1 sm:min-w-[280px] lg:min-w-[300px] sm:max-w-[200px] lg:max-w-[300px] hidden sm:block border-r"
      >
        <div className="px-3 py-2">
          <div className="pb-12">
            <Sidebar />
          </div>
        </div>
      </div>
      <div
        id="layout-fake"
        className="relative z-1 sm:min-w-[280px] lg:min-w-[300px] hidden sm:block h-full"
      />
      <div className="relative w-full">
        {/* {currWorkspace?.step === WorkspaceStep.ON_BOARDING && (
          <WorkspaceOnBoarding
            key={currWorkspace.id}
            entityId={currWorkspace.id}
          ></WorkspaceOnBoarding>
        )} */}
        {workspace?.step === WorkspaceStep.CREATED && <WorkspaceContents />}
        {/* {currWorkspace == null && <WorkspaceEmpty />} */}
      </div>
    </div>
  );
}
