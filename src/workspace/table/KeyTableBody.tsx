import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/index";
import { clickRow, updateRow } from "@/workspaces/workspaceSlice";
import { useId } from "react";

export function KeyTableBody({ index }: { index: number }) {
  const currentWorkspace = useAppSelector(
    (state) => state.workspaceSlice.currentWorkspace
  );

  const id = useId();
  const dispatch = useAppDispatch();

  const update = ({
    key,
    value,
    index,
  }: {
    key: string | "key";
    value: string;
    index: number;
  }) => {
    dispatch(
      updateRow({
        key,
        value,
        index,
      })
    );
  };
  return (
    <TableBody>
      <TableRow
        onClick={() => {
          dispatch(clickRow(index));
        }}
      >
        <TableCell>
          <Textarea
            onClick={(e) => e.stopPropagation()}
            value={currentWorkspace?.rows[index].langs.key}
            onChange={(e) => {
              update({
                key: "key",
                value: e.target.value,
                index: index,
              });
            }}
          />
        </TableCell>
        {currentWorkspace?.contents?.langs.map((value, _idx) => {
          return (
            <TableCell key={`${value}_index_${id}_${_idx}`}>
              <Textarea
                onClick={(e) => e.stopPropagation()}
                value={currentWorkspace?.rows[index].langs[value]}
                onChange={(e) => {
                  update({
                    key: value,
                    value: e.target.value,
                    index: index,
                  });
                }}
              />
            </TableCell>
          );
        })}
      </TableRow>
    </TableBody>
  );
}
