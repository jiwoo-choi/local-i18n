import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/index";
import { addCondition } from "@/workspaces/workspace-content/contents/translate-replace/@data/translateConditionSlice";
import { ConditionCard } from "@/workspaces/workspace-content/contents/translate-replace/input-step/ConditionCard";
import { Plus } from "lucide-react";

export function InputStepLayout() {
  const ids = useAppSelector((state) => state.translateConditionSlice.ids);
  const dispatch = useAppDispatch();

  return (
    <div className="flex space-y-4 flex-col">
      <div>
        <h3 className="text-lg font-medium">단어 변환하기</h3>
        <p className="text-sm text-muted-foreground">
          번역어 내 특정 단어를 변환할 수 있어요. <br />
          변경되기 전에&nbsp;
          <span className="underline">어떤 내용이 바뀌는지 </span>
          확인시켜드려요.
        </p>
      </div>
      <div className="grid grid-cols-1 space-y-2">
        {ids.map((value, index) => {
          return (
            <ConditionCard entityId={value} index={index + 1} key={value} />
          );
        })}
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => {
            dispatch(
              addCondition({
                entityId: Date.now().toString(),
              })
            );
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          컨디션 추가하기
        </Button>
      </div>
    </div>
  );
}
