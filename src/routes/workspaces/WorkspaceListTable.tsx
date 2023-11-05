import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeWorkspaces } from "@/globalDataSlice";
import { useAppDispatch, useAppSelector } from "@/index";
import { useIdGenerator } from "@/lib/useIdGenerator";
import { EntityId } from "@reduxjs/toolkit";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

export function WorkspaceListTable({
  isDeleteMode,
}: {
  isDeleteMode: boolean;
}) {
  const navigate = useNavigate();
  const workspaces = useAppSelector(
    (state) => state.globalDataSlice.workspaceList
  );
  const dispatch = useAppDispatch();
  const [deleteValue, setDeleteValue] = useState(() =>
    workspaces.ids.reduce((memo, curr) => {
      memo[curr] = false;
      return memo;
    }, {} as Record<EntityId, boolean>)
  );
  const isDisabled = useMemo(() => {
    return Object.values(deleteValue).every((value) => value === false);
  }, [deleteValue]);
  const deleteKeys = useMemo(() => {
    return Object.keys(deleteValue).filter((key) => {
      return deleteValue[key] === true;
    });
  }, [deleteValue]);

  const idGenerator = useIdGenerator();
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {isDeleteMode && <TableHead className="w-[30px]"></TableHead>}
            <TableHead>워크스페이스 이름</TableHead>
            <TableHead>워크스페이스 관리 언어</TableHead>
            <TableHead className="text-center">등록된 row 개수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.ids.map((id, index) => (
            <TableRow
              key={idGenerator(id, index)}
              onClick={() => {
                !isDeleteMode && navigate(`/workspaces/${id}`);
                isDeleteMode &&
                  setDeleteValue((prev) => {
                    return { ...prev, [id]: !prev[id] } as Record<
                      EntityId,
                      boolean
                    >;
                  });
              }}
            >
              {isDeleteMode && (
                <TableCell className="">
                  <Checkbox checked={deleteValue[id]} />
                </TableCell>
              )}
              <TableCell className="font-medium w-[250px]">
                {workspaces.entities[id]?.title}
              </TableCell>
              <TableCell className="w-[300px]">
                <div className="flex gap-1">
                  {workspaces.entities[id]?.contents?.langMeta.map(
                    (value, index) => {
                      return (
                        <Badge key={idGenerator(value.key, index)}>
                          {value.name}
                        </Badge>
                      );
                    }
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {workspaces.entities[id]?.rows.ids.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isDeleteMode && (
        <Button
          variant={"destructive"}
          disabled={isDisabled}
          onClick={() => {
            if (isDisabled) {
              return;
            }
            dispatch(removeWorkspaces(deleteKeys));
          }}
        >
          삭제하기
        </Button>
      )}
    </>
  );
}
