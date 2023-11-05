import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/index";
import { SwitchCase } from "@/lib/SwitchCase";
// import { useCurrentWorkspaceID } from "@/legacy/workspaces/@data/CurrentWorkspaceProvider";
import {
  useCurrentWorkspaceMode,
  WorkspaceMode,
} from "@/legacy/workspaces/workspace-content/@data/CurrentWorkspaceModeProvider";
import { submitChangeResult } from "@/routes/workspaces/:workspaceId/replace/translateReplaceChangeSlice";
// import { CompleteStepLayout } from "@/routes/workspaces/:workspaceId/replace/result";
// import { InputStepLayout } from "@/routes/workspaces/:workspaceId/replace/condition";
import { TranslateReplaceStep } from "@/routes/workspaces/:workspaceId/replace/TranslateReplaceStep";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function TranslateReplaceLayout() {
  const [step, setStep] = useState(
    TranslateReplaceStep.INPUT_LANGUAGES_KEYWORD
  );
  // const { currWorkspaceId } = useCurrentWorkspaceID();
  const currWorkspaceId = "";
  const { setWorkspaceMode } = useCurrentWorkspaceMode();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (step === TranslateReplaceStep.FINISH) {
      // dispatch();
      setWorkspaceMode(WorkspaceMode.VIEW);
    }
  }, [step, setWorkspaceMode]);
  return (
    <>
      <div className="p-5 mb-[62px]">
        <SwitchCase
          caseBy={{
            [TranslateReplaceStep.INPUT_LANGUAGES_KEYWORD]: <></>,
            [TranslateReplaceStep.COMPLETED]: <></>,
          }}
          value={step}
        ></SwitchCase>
      </div>
      <div
        className="fixed z-50 bottom-0 h-[62px] border-t w-full bg-white"
        style={{ width: "calc(100% - 300px)" }}
      >
        <div className="flex items-center justify-between h-full w-full px-3 ">
          <Button
            className="hover:shadow-lg hover:drop-shadow-sm"
            onClick={() => {
              if (step - 1 === 0) {
                setWorkspaceMode(WorkspaceMode.VIEW);
                return;
              }
              setStep(step - 1);
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            이전으로
          </Button>

          <div className="flex items-center flex-row space-x-4">
            <div className=" text-muted-foreground text-sm text-right">
              최종 스텝으로 가기 전 까지 <br />
              <span className="underline">데이터는 변경되지 않습니다</span>
            </div>
            <Button
              className="hover:shadow-lg hover:drop-shadow-sm"
              onClick={() => {
                if (
                  step + 1 === TranslateReplaceStep.FINISH &&
                  currWorkspaceId
                ) {
                  dispatch(
                    submitChangeResult({ workspaceId: currWorkspaceId })
                  );
                }
                setStep(step + 1);
              }}
            >
              다음 스텝으로 ({step} / 2)
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
