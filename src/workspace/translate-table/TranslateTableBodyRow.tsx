import { TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/index";
import { LanguageKeyType } from "@/language/@data/Language";
import { cn } from "@/lib/utils";
import { useCurrRowID } from "@/workspace/@data/CurrentRowProvider";
import {
  findByRowIdSelector,
  findByWorkspaceIdSelector,
} from "@/workspaces/@data/workspaceSelectors";
import { updateCell } from "@/workspaces/@data/workspaceSlice";
import { EntityId } from "@reduxjs/toolkit";
import { useId } from "react";

export function TranslateTableBodyRow({ rowId }: { rowId: EntityId }) {
  const dispatch = useAppDispatch();
  const uniq_id = useId();
  const { workspaceOfRowsId, currRow, goToRow } = useCurrRowID();
  const thisRow = useAppSelector(findByRowIdSelector(workspaceOfRowsId, rowId));
  const currentWorkspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceOfRowsId)
  );
  const isHighlighted = currRow && rowId === currRow?.id;
  if (!currentWorkspace) {
    return null;
  }
  if (!thisRow) {
    return null;
  }

  return (
    <TableRow
      onClick={() => {
        if (rowId === currRow?.id) {
          goToRow("");
          return;
        }
        goToRow(rowId);
      }}
      className={cn(isHighlighted ? "bg-muted hover:bg-muted" : "")}
    >
      <TableCell>
        <Textarea
          onClick={(e) => e.stopPropagation()}
          value={thisRow.key}
          onChange={(e) => {
            dispatch(
              updateCell({
                cell: {
                  translateKey: e.target.value,
                },
                rowId: rowId,
                workspaceId: workspaceOfRowsId,
              })
            );
          }}
        />
      </TableCell>
      {currentWorkspace.contents?.langMeta.map((lang, _idx) => {
        return (
          <TableCell key={`${lang.key}_index_${uniq_id}_${_idx}`}>
            <Textarea
              onClick={(e) => e.stopPropagation()}
              value={thisRow.langs[lang.key]}
              onChange={(e) => {
                dispatch(
                  updateCell({
                    cell: {
                      translateValue: e.target.value,
                      langKey: lang.key,
                    },
                    rowId: rowId,
                    workspaceId: workspaceOfRowsId,
                  })
                );
              }}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
