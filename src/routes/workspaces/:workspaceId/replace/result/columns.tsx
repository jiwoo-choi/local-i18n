import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AppDispatch } from "@/index";
import { LANGUAGES, LanguageKeyType } from "@/language/Language";
import {
  ChangeRowType,
  changeRowCellSelect,
  changeRowCellSelectAll,
} from "@/routes/workspaces/:workspaceId/replace/translateReplaceChangeSlice";
// import {
import sanitzeHtml from "sanitize-html";
//   changeRowCellSelectAll,
// } from "@/workspaces/workspace-content/contents/translate-replace/@data/translateReplaceSlice";
import { FunctionComponent } from "react";

type EachCellComponentType = FunctionComponent<{
  dispatch: AppDispatch;
  table: ChangeRowType[];
}>;
type EachCellWithEntityIdComponentType = FunctionComponent<{
  row: ChangeRowType;
  dispatch: AppDispatch;
}>;

export const columns: readonly {
  accessorKey?: string;
  header?: EachCellComponentType;
  cell?: EachCellWithEntityIdComponentType;
}[] = [
  {
    accessorKey: "select",
    header: ({ table, dispatch }) => {
      const isAllSelected = table.every((value) => value.isSelected === true);
      return (
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={() =>
            dispatch(changeRowCellSelectAll(!isAllSelected))
          }
          aria-label="Select all"
        />
      );
    },
    cell: ({ row, dispatch }) => {
      return (
        <Checkbox
          checked={row?.isSelected}
          onCheckedChange={(value) =>
            dispatch(
              changeRowCellSelect({ id: row?.entityId, select: !!value })
            )
          }
          aria-label="Select row"
        />
      );
    },
  },
  {
    accessorKey: "langKey",
    header: () => <div className="text-center">언어</div>,
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex justify-center">
    //       <Badge variant={"default"}>
    //         {LANGUAGES[row.original.langKey as LanguageKeyType].name}
    //       </Badge>
    //     </div>
    //   );
    // },
    // size: 100,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Badge variant={"default"}>
            {LANGUAGES[row.langKey as LanguageKeyType].name}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "key",
    header: () => <div className="text-center">key</div>,
    cell: ({ row }) => {
      return <div className="font-medium text-center text-xs">{row.key}</div>;
    },
    // size: 280,
  },
  {
    accessorKey: "targetKeyword",
    header: () => <div className="text-center">원래 문구</div>,
    cell: ({ row }) => {
      // cell.getContext().table.get
      //
      const replace = row.originString.replaceAll(
        row.targetKeyword,
        (value) => {
          return `<span class="underline bg-red-200 font-bold">${sanitzeHtml(
            value,
            {
              allowedTags: [],
              disallowedTagsMode: "escape",
              enforceHtmlBoundary: true,
            }
          )}</span>`;
        }
      );
      return (
        <div
          className="text-left"
          dangerouslySetInnerHTML={{ __html: replace }}
        >
          {/* {row.original.originString} */}
        </div>
      );
    },
  },
  {
    accessorKey: "replaceKeyword",
    header: () => <div className="text-center">변경되는 문구</div>,
    cell: ({ row }) => {
      const replace = row.originString.replaceAll(row.targetKeyword, () => {
        return `<span class="underline bg-green-200 font-bold">${sanitzeHtml(
          row.replaceKeyword,
          {
            allowedTags: [],
            disallowedTagsMode: "escape",
            enforceHtmlBoundary: true,
          }
        )}</span>`;
      });
      return (
        <div
          className="text-left"
          dangerouslySetInnerHTML={{ __html: replace }}
        ></div>
      );
    },
  },
] as const;
