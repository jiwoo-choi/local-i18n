import { useAppSelector } from "@/index";
import { LANGUAGES, LanguageKeyType } from "@/language/@data/Language";
import {
  findByRowIdSelector,
  findByWorkspaceIdSelector,
} from "@/workspaces/@data/workspaceSelectors";
import { EntityId } from "@reduxjs/toolkit";
import { useMemo } from "react";

/**
 * workspace의 특정 row에서 현재 사용할 수 있는 langauges를 추출합니다.
 * @returns
 */
export function usePossibleLanguages({
  workspaceId,
  rowId,
}: {
  workspaceId: EntityId;
  rowId: EntityId;
}) {
  const workspace = useAppSelector(findByWorkspaceIdSelector(workspaceId));
  const row = useAppSelector(findByRowIdSelector(workspaceId, rowId));
  return useMemo(() => {
    if (!row) {
      return [];
    }
    return (Object.keys(row.langs) as LanguageKeyType[])
      .filter((key) => !!row.langs[key as keyof typeof row.langs])
      .filter((item, index) => {
        const included = workspace?.contents?.langMeta.find(
          (value) => value.key === item
        )
          ? true
          : false;
        return included;
      })
      .sort((a, b) => LANGUAGES[a].sort - LANGUAGES[b].sort);
  }, [row, workspace]);
}
