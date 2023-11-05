import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { addRow } from "@/globalDataSlice";
import { useAppDispatch } from "@/index";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { TranslateTableBody } from "@/routes/workspaces/:workspaceId/viewer/TranslateTableBody";
import { TranslateTableHeader } from "@/routes/workspaces/:workspaceId/viewer/TranslateTableHeader";
import { Plus } from "lucide-react";
import { useId } from "react";

export function TranslateTableLayout() {
  const isDeleteMode = false;
  const id = useId();
  const dispatch = useAppDispatch();
  const { workspaceId } = useWorkspaceDetail();

  return (
    <div className="">
      <Table>
        <TranslateTableHeader isDeleteMode={isDeleteMode} />
        <TranslateTableBody isDeleteMode={isDeleteMode} />
      </Table>
      <Button
        className="w-full"
        variant={"secondary"}
        onClick={() => {
          dispatch(
            addRow({
              workspaceId: workspaceId,
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
