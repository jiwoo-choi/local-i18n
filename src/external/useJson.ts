import { useAppSelector } from "@/index";
import { LANGUAGES } from "@/language/@data/Language";
import {
  findByWorkspaceIdSelector,
  rowNormalizerSelectors,
} from "@/workspaces/@data/workspaceSelectors";
import { rowNormalizer } from "@/workspaces/@data/workspaceSlice";
import { EntityId } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";

export function useJSON(workspaceEntityId: EntityId) {
  const workspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceEntityId)
  );
  const rowEntities = workspace?.rows ?? rowNormalizer.getInitialState();
  const rows = rowNormalizerSelectors.selectAll(rowEntities);
  return {
    // makeJson: makeJson,
    downloadJson: (title: string) => {
      const all =
        rows?.map((value) => ({
          key: value.key,
          ...value.langs,
        })) ?? [];
      const reduced = all.reduce((memo, { KO, key, JP, EN, CN }) => {
        memo[LANGUAGES.KO.key] = {
          ...{ ...(memo[LANGUAGES.KO.key] ?? {}) },
          [key]: KO ?? "",
        };
        memo[LANGUAGES.EN.key] = {
          ...{ ...(memo[LANGUAGES.EN.key] ?? {}) },
          [key]: EN ?? "",
        };
        memo[LANGUAGES.JP.key] = {
          ...{ ...(memo[LANGUAGES.JP.key] ?? {}) },
          [key]: JP ?? "",
        };
        memo[LANGUAGES.CN.key] = {
          ...{ ...(memo[LANGUAGES.CN.key] ?? {}) },
          [key]: CN ?? "",
        };
        return memo;
      }, {} as Record<string, Record<string, string>>);
      const { ko, en, jp, cn } = reduced;
      var koFile = new File([JSON.stringify(ko)], `${title}_ko.json`, {
        type: "text/plain;charset=utf-8",
      });
      var enFile = new File([JSON.stringify(en)], `${title}_en.json`, {
        type: "text/plain;charset=utf-8",
      });
      var jpFile = new File([JSON.stringify(jp)], `${title}_jp.json`, {
        type: "text/plain;charset=utf-8",
      });
      var cnFile = new File([JSON.stringify(cn)], `${title}_cn.json`, {
        type: "text/plain;charset=utf-8",
      });

      saveAs(koFile);
      saveAs(enFile);
      saveAs(jpFile);
      saveAs(cnFile);
    },
  };
}
