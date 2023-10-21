import { TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/index";
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
  const updateCellByLangKey = ({
    translateValue,
    langKey,
  }: {
    langKey: string | "key";
    translateValue: string;
  }) => {
    dispatch(
      updateCell({
        cell: {
          translateKey: thisRow.key,
          translateValue: translateValue,
          langKey: langKey,
        },
        rowId: rowId,
        workspaceId: workspaceOfRowsId,
      })
    );
  };

  return (
    <TableRow
      onClick={() => {
        goToRow(rowId);
      }}
      className={cn(isHighlighted ? "bg-muted hover:bg-muted" : "")}
    >
      <TableCell>
        <Textarea
          onClick={(e) => e.stopPropagation()}
          value={thisRow.key}
          onChange={(e) => {
            updateCellByLangKey({
              langKey: "key",
              translateValue: e.target.value,
            });
          }}
        />
      </TableCell>
      {currentWorkspace.contents?.langs.map((langKey, _idx) => {
        return (
          <TableCell key={`${langKey}_index_${uniq_id}_${_idx}`}>
            <Textarea
              onClick={(e) => e.stopPropagation()}
              value={thisRow.langs[langKey]}
              onChange={(e) => {
                updateCellByLangKey({
                  langKey: langKey,
                  translateValue: e.target.value,
                });
              }}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
