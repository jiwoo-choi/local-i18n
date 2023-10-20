import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/index";
import { KeyTableBody } from "@/workspace/table/KeyTableBody";
import { addRow } from "@/workspaces/workspaceSlice";
import { Plus } from "lucide-react";
import { useId } from "react";

export function KeyTableHeader() {
  const currentWorkspace = useAppSelector(
    (state) => state.workspaceSlice.currentWorkspace
  );
  const dispatch = useAppDispatch();
  const id = useId();

  return (
    <div className="flex justify-center flex-col p-3">
      <Table>
        <TableHeader>
          <TableRow className="content-center">
            <TableHead>key</TableHead>
            {currentWorkspace?.contents?.langs.map((value, index) => {
              return <TableHead key={`${value}_${index}`}>{value}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        {currentWorkspace?.rows.map((value, index) => {
          return <KeyTableBody index={index} key={index} />;
        })}
      </Table>
      <Button
        variant={"secondary"}
        onClick={() => {
          dispatch(
            addRow({
              id: `${Date.now().toString()}_${id}`,
              key: "",
              langs: { key: "" },
            })
          );
        }}
      >
        <Plus className="h-4 w-4"></Plus>
      </Button>
    </div>
  );
}
