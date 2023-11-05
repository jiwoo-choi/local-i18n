import {
  loaderReduxWrapper,
  useTypeSafeLoaderData,
} from "@/lib/react-router/loaderUtil";
import { WorkspaceDetailProivder } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { WorkspaceDetailMenuBar } from "@/routes/workspaces/:workspaceId/WorkspaceDetailMenubar";
import { Outlet, redirect, useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { WorkspaceDetailChanger } from "@/routes/workspaces/:workspaceId/WorkspaceDetailChanger";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { OperationDialogOpenProvider } from "@/routes/workspaces/:workspaceId/_menuDialog/OperationDialogOpenProvider";

export const loader = loaderReduxWrapper(async ({ params, context }) => {
  const workspaceId = params.workspaceId;
  if (!workspaceId) {
    return redirect("/");
  }
  const globalDataSlice = context?.state.globalDataSlice;
  if (!globalDataSlice?.workspaceList.entities[workspaceId]) {
    return redirect("/");
  }
  return { workspaceId: workspaceId };
});

export function Layout() {
  const navigate = useNavigate();

  const { workspaceId } = useTypeSafeLoaderData<typeof loader>();
  return (
    <WorkspaceDetailProivder workspaceId={workspaceId}>
      <OperationDialogOpenProvider>
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-2 p-2 items-center">
            <WorkspaceDetailChanger />
            <WorkspaceDetailMenuBar />
          </div>
          <Button
            variant={"secondary"}
            className="mr-3"
            size="sm"
            onClick={() => {
              navigate("/workspaces");
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            워크스페이스 목록으로
          </Button>
        </div>
        <Separator />
        <Outlet />
      </OperationDialogOpenProvider>
    </WorkspaceDetailProivder>
  );
}
