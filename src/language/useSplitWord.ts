import { useAppSelector } from "@/index";
import { usePossibleLanguages } from "@/language/usePossibleLanguages";
import { findByRowIdSelector } from "@/globalDataQueries";
import { EntityId } from "@reduxjs/toolkit";
import { useMemo } from "react";

/**
 * 특정 Row에서 가능한 언어들의 단어 토큰 목록을 뽑아줍니다.
 * @param param0
 * @returns
 */
export function useSplitWordFromRow({
  workspaceId,
  rowId,
}: {
  workspaceId: EntityId;
  rowId: EntityId;
}) {
  const possibleLangaues = usePossibleLanguages({
    workspaceId: workspaceId,
    rowId: rowId,
  });
  const row = useAppSelector(findByRowIdSelector(workspaceId, rowId));
  const splitted = useMemo(() => {
    return possibleLangaues.map((value) => {
      const segmenterFr = new Intl.Segmenter("en", {
        granularity: "word",
      });
      return {
        key: value,
        value: Array.from(
          segmenterFr.segment(row?.langs[value] ?? "")[Symbol.iterator]()
        ),
      };
    });
  }, [possibleLangaues, row]);
  return splitted;
}
