import { useAppDispatch, useAppSelector } from "@/index";
import { loaderReduxWrapper } from "@/lib/react-router/loaderUtil";
import { CompleteData } from "@/routes/workspaces/:workspaceId/replace/result/CompleteData";
import {
  useAggregate,
  useFullscan,
} from "@/routes/workspaces/:workspaceId/replace/result/useScan";
import { updateChangesAll } from "@/routes/workspaces/:workspaceId/replace/translateReplaceChangeSlice";
import { useEffect } from "react";
import { redirect } from "react-router";

export const loader = loaderReduxWrapper(async ({ context }) => {
  const conditions = context?.state.translateConditionSlice;
  if (conditions?.ids) {
    if (conditions.ids.length === 0) {
      alert("저장된 condition이 없습니다.");
      return redirect("/");
    }
  }
  return null;
});

export function Layout() {
  const conditions = useAppSelector((state) => state.translateConditionSlice);
  const data = useFullscan(useAggregate(conditions.entities));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateChangesAll(data));
  }, [data, dispatch]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return <CompleteData />;
}
