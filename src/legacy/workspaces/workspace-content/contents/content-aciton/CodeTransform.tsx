import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  WorkspaceMode,
  useCurrentWorkspaceMode,
} from "@/legacy/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
import { Code } from "lucide-react";
export function CodeTransform() {
  const { setWorkspaceMode } = useCurrentWorkspaceMode();

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={"outline"}
            onClick={() => {
              setWorkspaceMode(WorkspaceMode.CODE_TRANSFORM);
            }}
          >
            <Code className="h-4 w-4 mr-1" />
            코드 변환 모드
          </Button>
        </TooltipTrigger>
        <TooltipContent align={"start"} side="bottom">
          <div className="p-2 flex space-y-2 flex-col">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              코드 변환 기능.
            </h2>
            <p>코드 내의 한국어를 코드 호환 가능한 형태로 변경합니다.</p>
            <p>이미 적용되어있는 번역어를 한국어로 변환합니다.</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
