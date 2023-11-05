import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rowNormalizerSelectors } from "@/globalDataQueries";
import {
  removeRows,
  rowNormalizer,
  workspaceNormalizer,
} from "@/globalDataSlice";
import { useAppDispatch, useAppSelector } from "@/index";
import { useCheckSelectReducer } from "@/lib/useCheckSelectReducer";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { columns } from "@/routes/workspaces/:workspaceId/delete/columns";
import { EntityId } from "@reduxjs/toolkit";
import { ArrowLeft, Trash, X } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export function Layout() {
  const { workspace, workspaceId } = useWorkspaceDetail();
  const { entities, ids } = workspace?.rows ?? rowNormalizer.getInitialState();

  const table = useMemo(() => {
    return rowNormalizerSelectors.selectAll(
      workspace?.rows ?? rowNormalizer.getInitialState()
    );
  }, [workspace]);

  const initialState = useMemo(() => {
    if (!workspace?.rows) {
      return {};
    }
    return rowNormalizerSelectors
      .selectIds(workspace.rows)
      .reduce((memo, curr) => {
        memo[curr] = false;
        return memo;
      }, {} as Record<EntityId, boolean>);
  }, []);
  const { dispatch, isSelectAll, stateMap, currentSelectedIds } =
    useCheckSelectReducer(initialState);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex justify-between p-3">
        <div></div>
        <div className="flex gap-1">
          <Button
            variant={"destructive"}
            onClick={() => {
              appDispatch(
                removeRows({
                  workspaceId: workspaceId,
                  rowIds: currentSelectedIds,
                })
              );
              navigate(`/workspaces/${workspaceId}`, { replace: true });
            }}
          >
            <Trash className="h-4 w-4 mr-2" />
            삭제하기
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              navigate(`/workspaces/${workspaceId}`);
            }}
          >
            <X className="h-4 w-4 mr-2" />
            취소하기
          </Button>
        </div>
      </div>
      <Table className="w-screen text-xs">
        <TableHeader>
          <TableRow>
            {columns.map((value, index) => {
              if (value.isDynamicColumn) {
                return value
                  .columnGenerator?.(
                    workspace?.contents?.langMeta.map((value) => value.key) ??
                      []
                  )
                  .map((value, index_) => (
                    <TableHead key={`$header_${index}_${index_}_dd`}>
                      {value.header?.({ dispatch, table, isSelectAll })}
                    </TableHead>
                  ));
              } else {
                return (
                  <TableHead key={`$header_${index}`}>
                    {value.header?.({ dispatch, table, isSelectAll })}
                  </TableHead>
                );
              }
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ids.map((entityId, index) => {
            return (
              <TableRow>
                {columns.map((value) => {
                  const row = entities[entityId];
                  if (!row) {
                    return null;
                  }
                  if (value.isDynamicColumn) {
                    return value
                      .columnGenerator?.(
                        workspace?.contents?.langMeta.map(
                          (value) => value.key
                        ) ?? []
                      )
                      .map((value) => (
                        <TableCell
                          key={`${value.accessorKey}_${index}_${entityId}_d`}
                        >
                          <>
                            {value.cell?.({
                              dispatch,
                              row: row,
                              isSelect: stateMap[entityId],
                            })}
                          </>
                        </TableCell>
                      ));
                  } else {
                    return (
                      <TableCell
                        key={`${value.accessorKey}_${index}_${entityId}`}
                      >
                        <>
                          {value.cell?.({
                            dispatch,
                            row: row,
                            isSelect: stateMap[entityId],
                          })}
                        </>
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
