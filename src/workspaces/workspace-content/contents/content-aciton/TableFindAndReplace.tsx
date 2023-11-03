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
} from "@/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
import { Replace } from "lucide-react";

export function TableFindAndReplace() {
  const { setWorkspaceMode } = useCurrentWorkspaceMode();
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={"outline"}
            onClick={() => {
              setWorkspaceMode(WorkspaceMode.MODIFY);
            }}
          >
            <Replace className="h-4 w-4 mr-1" />
            단어 변환
          </Button>
        </TooltipTrigger>
        <TooltipContent align={"start"} side="bottom">
          <div className="p-2 flex space-y-2 flex-col">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              단어 변환 기능
            </h2>
            <p>각 번역어별 언어별 특정 단어를 지정한 문구로 일괄 치환합니다.</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
