import { useAppDispatch, useAppSelector } from "@/index";
import { LanguageKeyType } from "@/language/Language";
import { ConditionType } from "@/routes/workspaces/:workspaceId/replace/translateConditionSlice";
import {
  ChangeRowType,
  updateChangesAll,
} from "@/routes/workspaces/:workspaceId/replace/translateReplaceChangeSlice";
import { CompleteData } from "@/routes/workspaces/:workspaceId/replace/result/CompleteData";
import { Dictionary } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";

export function useAggregate(conditionEntities: Dictionary<ConditionType>) {
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
export function useFullscan(
  aggregatedMap: Record<
    LanguageKeyType,
    Pick<ConditionType, "replaceKeyword" | "targetKeyword">[]
  >
) {
  const { workspace } = useWorkspaceDetail();

  // const { currWorkspace } = useCurrentWorkspaceID();
  return useMemo(() => {
    if (!workspace) {
      return [];
    }
    const changes: ChangeRowType[] = [];
    workspace.rows.ids.map((id) => {
      Object.keys(aggregatedMap).forEach((langKey) => {
        const row = workspace.rows.entities[id];
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
  }, [workspace, aggregatedMap]);
}
