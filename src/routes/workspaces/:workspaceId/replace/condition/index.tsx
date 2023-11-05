import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/index";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { ConditionCard } from "@/routes/workspaces/:workspaceId/replace/condition/ConditionCard";
import {
  addCondition,
  resetConditions,
} from "@/routes/workspaces/:workspaceId/replace/translateConditionSlice";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Layout() {
  const ids = useAppSelector((state) => state.translateConditionSlice.ids);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetConditions());
  }, []);

  return (
    <div className="grid grid-cols-1 space-y-2 px-6">
      {ids.map((value, index) => {
        return <ConditionCard entityId={value} index={index + 1} key={value} />;
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
  );
}
