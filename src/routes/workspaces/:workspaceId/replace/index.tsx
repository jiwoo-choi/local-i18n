import { Button } from "@/components/ui/button";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Outlet, matchPath, useLocation, useNavigate } from "react-router";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isBackAvailable = useMemo(() => {
    return (
      matchPath(
        `/workspaces/:workspaceId/replace/result`,
        location.pathname
      ) !== null
    );
  }, [location]);

  const { workspaceId } = useWorkspaceDetail();
  return (
    <div className="flex space-y-4 flex-col">
      <div className="flex flex-row justify-between items-center file:sticky top-0 bg-white p-6 border-b-2">
        <div>
          <h3 className="text-lg font-medium">단어 변환하기</h3>
          <p className="text-sm text-muted-foreground">
            번역어 내 특정 단어를 변환할 수 있어요. <br />
          </p>
        </div>
        <div className="flex gap-2">
          {isBackAvailable && (
            <Button
              variant={"outline"}
              onClick={() => {
                navigate(`/workspaces/${workspaceId}/replace/condition`, {});
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              condition으로 돌아가기
            </Button>
          )}
          <Button
            variant={"outline"}
            onClick={() => {
              navigate(`/workspaces/${workspaceId}/replace/result`, {
                replace: true,
              });
            }}
          >
            다음
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
