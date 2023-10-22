import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { WorkspaceStep } from "@/workspaces/@data/workspaceSlice";
import { WorkspaceContents } from "@/workspaces/WorkspaceContents";
import { WorkspaceEmpty } from "@/workspaces/WorkspaceEmpty";
import { WorkspaceOnBoarding } from "@/workspaces/onboarding/WorkspaceOnBoarding";
import { Sidebar } from "@/workspaces/sidebar/Sidebar";

{
  /** cols로 하는 방식들은 대응해야할게 많음. grid는 동적 컨트롤 하기 좋으니 후에 고려 */
}

export function WorkspaceLayout() {
  const { currWorkspaceId, currWorkspace } = useCurrentWorkspaceID();
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
        {currWorkspace?.step === WorkspaceStep.ON_BOARDING && (
          <WorkspaceOnBoarding
            key={currWorkspace.id}
            entityId={currWorkspace.id}
          ></WorkspaceOnBoarding>
        )}
        {currWorkspace?.step === WorkspaceStep.CREATED && <WorkspaceContents />}
        {currWorkspace == null && <WorkspaceEmpty />}
      </div>
    </div>
  );
}
