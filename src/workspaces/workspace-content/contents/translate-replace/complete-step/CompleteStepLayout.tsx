import { useAppDispatch, useAppSelector } from "@/index";
import { LanguageKeyType } from "@/language/@data/Language";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { ConditionType } from "@/workspaces/workspace-content/contents/translate-replace/@data/translateConditionSlice";
import {
  ChangeRowType,
  updateChangesAll,
} from "@/workspaces/workspace-content/contents/translate-replace/complete-step/@data/translateReplaceChangeSlice";
import { CompleteData } from "@/workspaces/workspace-content/contents/translate-replace/complete-step/CompleteData";
import { Dictionary } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";

function useAggregate(conditionEntities: Dictionary<ConditionType>) {
  return useMemo(() => {
    return Object.values(conditionEntities).reduce((memo, curr) => {
      if (!curr) {
        return memo;
      }
      if (!curr.langKey) {
        return memo;
      }
      if (memo[curr.langKey] == null) {
        memo[curr.langKey] = [];
      }
      memo[curr.langKey].push({
        replaceKeyword: curr?.replaceKeyword,
        targetKeyword: curr?.targetKeyword,
      });
      return memo;
    }, {} as Record<LanguageKeyType, Pick<ConditionType, "replaceKeyword" | "targetKeyword">[]>);
  }, [conditionEntities]);
}
function useFullscan(
  aggregatedMap: Record<
    LanguageKeyType,
    Pick<ConditionType, "replaceKeyword" | "targetKeyword">[]
  >
) {
  const { currWorkspace } = useCurrentWorkspaceID();
  return useMemo(() => {
    if (!currWorkspace) {
      return [];
    }
    const changes: ChangeRowType[] = [];
    currWorkspace.rows.ids.map((id) => {
      Object.keys(aggregatedMap).forEach((langKey) => {
        const row = currWorkspace.rows.entities[id];
        if (row) {
          const cell = row.langs[langKey as LanguageKeyType];
          const checks = aggregatedMap[langKey as LanguageKeyType];
          if (cell && checks) {
            checks.forEach((value) => {
              if (cell.includes(value.targetKeyword ?? "")) {
                changes.push({
                  entityId: id,
                  key: row?.key,
                  langKey: langKey as LanguageKeyType,
                  originString: cell,
                  targetKeyword: value.targetKeyword ?? "",
                  replaceKeyword: value.replaceKeyword ?? "",
                  isSelected: false,
                });
              }
            });
          }
        }
      });
    });
    return changes;
  }, [currWorkspace, aggregatedMap]);
}
export function CompleteStepLayout() {
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
