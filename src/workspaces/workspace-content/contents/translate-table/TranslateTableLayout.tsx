import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { useAppDispatch } from "@/index";
import { TableActionLayout } from "@/workspaces/workspace-action/content-aciton/TableActionLayout";
import { useCurrRowID } from "@/workspaces/workspace-content/contents/translate-table/@data/CurrentRowProvider";
import { TranslateTableBodyLayout } from "@/workspaces/workspace-content/contents/translate-table/TranslateTableBodyLayout";
import { TranslateTableHeader } from "@/workspaces/workspace-content/contents/translate-table/TranslateTableHeader";
import { addRow } from "@/workspaces/@data/workspaceSlice";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

export function TranslateTableLayout() {
  const dispatch = useAppDispatch();
  const { workspaceOfRowsId } = useCurrRowID();
  const id = useId();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  // const colums: ColumnDef<
  //   {
  //     id: EntityId;
  //     key: string;
  //   } & Partial<Record<LanguageKeyType, string>>
  // > = [{ accessorKey: "1", header: "1" }];

  return (
    <div className="px-3">
      <TableActionLayout />
      <div className="flex justify-center flex-col ">
        <Table>
          <TranslateTableHeader isDeleteMode={isDeleteMode} />
          <TranslateTableBodyLayout isDeleteMode={isDeleteMode} />
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
    </div>
  );
}
