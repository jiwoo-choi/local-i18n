import { Button } from "@/components/ui/button";
import { SwitchCase } from "@/lib/SwitchCase";
import { CompleteStepLayout } from "@/workspaces/workspace-content/contents/translate-replace/complete-step/CompleteStepLayout";
import { InputStepLayout } from "@/workspaces/workspace-content/contents/translate-replace/input-step/InputStepLayout";
import { TranslateReplaceStep } from "@/workspaces/workspace-content/contents/translate-replace/TranslateReplaceStep";
import { ArrowBigRightDash, ArrowRight } from "lucide-react";
import { useState } from "react";

export function TranslateReplaceLayout() {
  const [step, setStep] = useState(
    TranslateReplaceStep.INPUT_LANGUAGES_KEYWORD
  );

  return (
    <>
      <div className="p-5 mb-[62px]">
        <SwitchCase
          caseBy={{
            [TranslateReplaceStep.INPUT_LANGUAGES_KEYWORD]: <InputStepLayout />,
            [TranslateReplaceStep.COMPLETED]: <CompleteStepLayout />,
          }}
          value={step}
        ></SwitchCase>
      </div>
      <div
        className="fixed z-50 bottom-0 h-[62px] border-t w-full bg-white"
        style={{ width: "calc(100% - 300px)" }}
      >
        <div className="flex items-center justify-between h-full w-full px-3 ">
          <div></div>
          <div className="flex items-center flex-row space-x-4">
            <div className=" text-muted-foreground text-sm text-right">
              최종 스텝으로 가기 전 까지 <br />
              <span className="underline">데이터는 변경되지 않습니다</span>
            </div>
            <Button
              className="hover:shadow-lg hover:drop-shadow-sm"
              onClick={() => {
                setStep(TranslateReplaceStep.COMPLETED);
              }}
            >
              다음 스텝으로 ({step} / 2)
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        {/* <motion.div
          {...spring}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
        >
        </motion.div> */}
      </div>
    </>
  );
}
