import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { useAppDispatch } from "@/index";
import { useCurrRowID } from "@/workspace/@data/CurrentRowProvider";
import { TranslateTableBodyLayout } from "@/workspace/translate-table/TranslateTableBodyLayout";
import { TranslateTableHeader } from "@/workspace/translate-table/TranslateTableHeader";
import { addRow } from "@/workspaces/@data/workspaceSlice";
import { Plus } from "lucide-react";
import { useId } from "react";

export function TranslateTableLayout() {
  const dispatch = useAppDispatch();
  const { workspaceOfRowsId } = useCurrRowID();
  const id = useId();

  return (
    <div className="flex justify-center flex-col p-3">
      <Table>
        <TranslateTableHeader />
        <TranslateTableBodyLayout />
      </Table>
      <Button
        variant={"secondary"}
        onClick={() => {
          dispatch(
            addRow({
              workspaceId: workspaceOfRowsId,
              row: {
                id: `${Date.now().toString()}_${id}`,
                key: "",
                langs: {},
              },
            })
          );
        }}
      >
        <Plus className="h-4 w-4"></Plus>
      </Button>
    </div>
  );
}
