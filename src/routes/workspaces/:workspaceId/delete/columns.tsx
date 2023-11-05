import { Checkbox } from "@/components/ui/checkbox";
import { RowType, WorkspaceType } from "@/globalDataSlice";
import { AppDispatch } from "@/index";
import { LANGUAGES, LanguageKeyType } from "@/language/Language";
import {
  SELECT_ALL,
  SELECT_ITEM,
  SelectDispatch,
} from "@/lib/useCheckSelectReducer";
// import {

//   changeRowCellSelectAll,
// } from "@/workspaces/workspace-content/contents/translate-replace/@data/translateReplaceSlice";
import { FunctionComponent } from "react";

type EachCellComponentType = FunctionComponent<{
  dispatch: SelectDispatch;
  table: RowType[];
  isSelectAll: boolean;
}>;

type EachCellWithEntityIdComponentType = FunctionComponent<{
  row: RowType;
  isSelect: boolean;
  dispatch: SelectDispatch;
}>;

export const columns: (
  | {
      accessorKey?: string;
      header?: EachCellComponentType;
      cell?: EachCellWithEntityIdComponentType;
      isDynamicColumn?: never;
      columnGenerator?: never;
    }
  | {
      accessorKey?: never;
      header?: never;
      cell?: never;
      isDynamicColumn?: boolean;
      columnGenerator?: (accessorKeys: string[]) => {
        accessorKey?: string;
        header?: EachCellComponentType;
        cell?: EachCellWithEntityIdComponentType;
      }[];
    }
)[] = [
  {
    accessorKey: "select",
    header: ({ table, dispatch, isSelectAll }) => {
      return (
        <Checkbox
          checked={isSelectAll}
          onCheckedChange={(e) => {
            dispatch(SELECT_ALL({ select: e === true }));
          }}
        ></Checkbox>
      );
    },
    cell: ({ row, dispatch, isSelect }) => (
      <Checkbox
        checked={isSelect}
        onCheckedChange={(e) => {
          dispatch(SELECT_ITEM({ id: row.id, select: e === true }));
        }}
      ></Checkbox>
    ),
  },
  {
    accessorKey: "key",
    header: ({ table, dispatch }) => <div>key</div>,
    cell: ({ row, dispatch }) => <>{row.key}</>,
  },
  {
    isDynamicColumn: true,
    columnGenerator: (accessorKeys) => {
      return accessorKeys.map((value) => {
        const key = value as LanguageKeyType;
        return {
          accessorKey: LANGUAGES[key].name,
          header: () => <>{LANGUAGES[key].name}</>,
          cell: ({ row }) => <>{row.langs[key]}</>,
        };
      });
    },
  },
];
