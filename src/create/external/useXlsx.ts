import { FormatType } from "@/create/format/FormatType";
import { useFormat } from "@/create/format/useFormat";
import { useId } from "react";
import * as XLSX from "xlsx";

export function useXlsx() {
  const { data } = useFormat();
  const id = useId();

  return {
    parseXlsx: (workbook: XLSX.WorkBook): FormatType => {
      const firstSheet = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheet];
      const koLike = sheet["B1"].v;
      const enLike = sheet["C1"].v;
      const jpLike = sheet["D1"].v;
      const cnLike = sheet["E1"].v;

      return Object.entries(sheet).reduce((memo, [key, value]) => {
        if (
          key === "A1" ||
          key === "B1" ||
          key === "C1" ||
          key === "D1" ||
          key === "E1"
        ) {
          return memo;
        }
        if (key.includes("A")) {
          memo[key] = {
            key: value.v,
            ko: "",
            en: "",
            jp: "",
            cn: "",
          };
          return memo;
        }
        if (key.includes("B")) {
          const newKey = key.replace(/[a-zA-Z]+/, "A");
          memo[newKey] = {
            ...memo[newKey],
            [koLike]: value.v,
          };
        }
        if (key.includes("C")) {
          const newKey = key.replace(/[a-zA-Z]+/, "A");
          memo[newKey] = {
            ...memo[newKey],
            [enLike]: value.v,
          };
        }

        if (key.includes("D")) {
          const newKey = key.replace(/[a-zA-Z]+/, "A");
          memo[newKey] = {
            ...memo[newKey],
            [jpLike]: value.v,
          };
        }

        if (key.includes("E")) {
          const newKey = key.replace(/[a-zA-Z]+/, "A");
          memo[newKey] = {
            ...memo[newKey],
            [cnLike]: value.v,
          };
        }
        return memo;
      }, {} as FormatType);
    },
    downloadXlsx: (title: string) => {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet([
        [
          { v: "key", t: "s" },
          { v: "ko", t: "s" },
          { v: "en", t: "s" },
          { v: "jp", t: "s" },
          { v: "cn", t: "s" },
        ],
        ...Object.entries(data).map(([k, { key, ko, en, jp, cn }]) => {
          return [{ v: key }, { v: ko }, { v: en }, { v: jp }, { v: cn }];
        }),
      ]);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `${title}.xlsx`, { type: "file", compression: true });
    },
  };
}
