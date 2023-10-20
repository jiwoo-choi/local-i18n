import { useFormat } from "@/create/format/useFormat";
import { useAppSelector } from "@/index";
import { RowType } from "@/workspaces/workspaceSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";

export function useJSON() {
  const currentWorkspace = useAppSelector(
    (state) => state.workspaceSlice.currentWorkspace
  );

  return {
    // makeJson: makeJson,
    downloadJson: (title: string) => {
      const all = currentWorkspace?.rows.map((value) => value.langs) ?? [];
      const reduced = all.reduce((memo, curr) => {
        memo["ko"] = {
          ...{ ...(memo["ko"] ?? {}) },
          [curr.key]: curr["ko"],
        };
        memo["en"] = {
          ...{ ...(memo["en"] ?? {}) },
          [curr.key]: curr["en"],
        };
        memo["jp"] = {
          ...{ ...(memo["jp"] ?? {}) },
          [curr.key]: curr["jp"],
        };
        memo["cn"] = {
          ...{ ...(memo["cn"] ?? {}) },
          [curr.key]: curr["cn"],
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
