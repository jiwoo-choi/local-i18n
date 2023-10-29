import { useAppDispatch, useAppSelector } from "@/index";
import { LANGUAGES } from "@/language/@data/Language";
import {
  findByWorkspaceIdSelector,
  rowNormalizerSelectors,
} from "@/workspaces/@data/workspaceSelectors";
import {
  RowType,
  importsRows,
  rowNormalizer,
} from "@/workspaces/@data/workspaceSlice";
import { EntityId } from "@reduxjs/toolkit";
import { ChangeEvent, useId } from "react";
import * as XLSX from "xlsx";

export enum CodeTransformOption {
  IM,
  SPRING_PROPERTIES,
  NEXT_TRANSLATE,
}
export enum XLSXExportStrategy {
  DOWNLOAD_ALL,
  WITH_TRANSFORM,
}

function downloadAllStrategy(data: RowType[]) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    [
      { v: "key", t: "s" },
      { v: "ko", t: "s" },
      { v: "en", t: "s" },
      { v: "jp", t: "s" },
      { v: "cn", t: "s" },
    ],
    ...data.map((value) => {
      const key = value.key;
      const { KO, EN, JP, CN } = value.langs;
      return [{ v: key }, { v: KO }, { v: EN }, { v: JP }, { v: CN }];
    }),
  ]);
  return {
    wb,
    ws,
  };
}

function downloadWithTransformStrategy(
  data: RowType[],
  transformOption: CodeTransformOption
) {
  const transformByCodeTransformOption = function (key: string) {
    switch (transformOption) {
      case CodeTransformOption.IM:
        return `IM('${key}')`;
      case CodeTransformOption.NEXT_TRANSLATE:
        return `t('${key}')`;
      case CodeTransformOption.SPRING_PROPERTIES:
        return `<spring:message code="${key}"/>`;
    }
  };

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    [
      { v: "key with code", t: "s" },
      { v: "translated keyword", t: "s" },
    ],
    ...data.map((value) => {
      const { KO } = value.langs;
      return [{ v: transformByCodeTransformOption(value.key) }, { v: KO }];
    }),
  ]);
  return { wb, ws };
}
export function useXlsx(workspaceEntityId: EntityId) {
  console.log(workspaceEntityId);
  const dispatch = useAppDispatch();
  const workspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceEntityId)
  );
  const rowEntities = workspace?.rows ?? rowNormalizer.getInitialState();
  const rows = rowNormalizerSelectors.selectAll(rowEntities);
  const uniq_id = useId();
  return {
    handleLoadXlsx: (
      e: ChangeEvent<HTMLInputElement>
    ): Promise<XLSX.WorkBook | null> => {
      if (!e.target.files || e.target.files.length < 1) {
        return Promise.resolve(null);
      }
      const file = e.target.files[0];
      const promise = new Promise<XLSX.WorkBook>((resolve) => {
        var reader = new FileReader();
        reader.onload = function (e) {
          /* e.target.result is an ArrayBuffer */
          resolve(XLSX.read(e.target?.result));
        };
        reader.readAsArrayBuffer(file);
      });
      return promise;
    },
    parseXlsx: (workbook: XLSX.WorkBook) => {
      const firstSheet = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheet];
      const converted = XLSX.utils.sheet_to_json(sheet) as {
        key: string;
        ko: string;
        en: string;
        cn: string;
        jp: string;
      }[];
      dispatch(
        importsRows({
          workspaceId: workspaceEntityId,
          rows: converted.map((value, index) => {
            return {
              id: Date.now().toString() + `${index}_${uniq_id}`,
              key: value.key,
              langs: {
                [LANGUAGES.EN.key]: value.en,
                [LANGUAGES.JP.key]: value.jp,
                [LANGUAGES.KO.key]: value.ko,
                [LANGUAGES.CN.key]: value.cn,
                key: undefined,
              },
            } as RowType;
          }) as RowType[],
        })
      );
    },
    downloadXlsx: ({
      title,
      transformOption,
      exportStrategy,
    }:
      | {
          title: string;
          exportStrategy: XLSXExportStrategy.WITH_TRANSFORM;
          transformOption: CodeTransformOption;
        }
      | {
          title: string;
          exportStrategy: XLSXExportStrategy.DOWNLOAD_ALL;
          transformOption?: never;
        }) => {
      if (exportStrategy === XLSXExportStrategy.DOWNLOAD_ALL) {
        const { ws, wb } = downloadAllStrategy(rows);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${title}.xlsx`, {
          type: "file",
          compression: true,
        });
      } else if (exportStrategy === XLSXExportStrategy.WITH_TRANSFORM) {
        const { ws, wb } = downloadWithTransformStrategy(rows, transformOption);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${title}.xlsx`, {
          type: "file",
          compression: true,
        });
      }
    },
  };
}
