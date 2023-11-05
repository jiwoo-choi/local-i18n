import { TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { findByRowIdSelector } from "@/globalDataQueries";
import { updateCell } from "@/globalDataSlice";
import { useAppDispatch, useAppSelector } from "@/index";
import { cn } from "@/lib/utils";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { EntityId } from "@reduxjs/toolkit";
import { useId } from "react";

export function TranslateTableBodyRow({
  rowId,
  isDeleteMode = false,
}: {
  rowId: EntityId;
  isDeleteMode?: boolean;
}) {
  const dispatch = useAppDispatch();
  const uniq_id = useId();
  const { workspaceId, workspace, currentRowId, changeCurrentRowId } =
    useWorkspaceDetail();
  const thisRow = useAppSelector(findByRowIdSelector(workspaceId, rowId));
  const currentWorkspace = workspace;

  const isHighlighted = currentRowId && rowId === currentRowId;
  if (!currentWorkspace) {
    return null;
  }
  if (!thisRow) {
    return null;
  }

  return (
    <TableRow
      onClick={() => {
        if (rowId === currentRowId) {
          changeCurrentRowId("");
          return;
        }
        changeCurrentRowId(rowId);
      }}
      className={cn(isHighlighted ? "bg-muted hover:bg-muted" : "")}
    >
      {isDeleteMode && (
        <TableCell className="w-[30px]">
          <div>delt</div>
        </TableCell>
      )}
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
                workspaceId: workspaceId,
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
                    workspaceId: workspaceId,
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
