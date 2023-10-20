import { useAppSelector } from "@/index";
import { WorkspaceContents } from "@/workspaces/WorkspaceContents";
import { WorkspaceEmpty } from "@/workspaces/WorkspaceEmpty";
import { WorkspaceOnBoarding } from "@/workspaces/onboarding/WorkspaceOnBoarding";
import { Sidebar } from "@/workspaces/sidebar/Sidebar";
import { WorkspaceStep } from "@/workspaces/workspaceSlice";

export function WorkspaceLayout() {
  const currentWorkspace = useAppSelector(
    (state) => state.workspaceSlice.currentWorkspace
  );
  return (
    <div
      className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      style={{ height: "calc(100vh - 63px)" }}
      id="adfadsf"
    >
      <div className="absolute lg:relative xl:relatve space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="pb-12 hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="col-span-4 lg:col-span-4 lg:border-l xl:col-span-5 relative">
        {currentWorkspace?.step === WorkspaceStep.ON_BOARDING && (
          <WorkspaceOnBoarding
            key={currentWorkspace.id}
            id={currentWorkspace.id}
          ></WorkspaceOnBoarding>
        )}
        {currentWorkspace?.step === WorkspaceStep.CREATED && (
          <WorkspaceContents />
        )}
        {currentWorkspace == null && <WorkspaceEmpty />}
      </div>
    </div>
  );
}
