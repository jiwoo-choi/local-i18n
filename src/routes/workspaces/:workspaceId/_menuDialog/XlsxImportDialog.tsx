import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useCurrRowID } from "@/routes/workspaces/:workspaceId/_content/CurrentRowProvider";
import { useXlsx } from "@/external/useXlsx";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { OperationDialogContext } from "@/routes/workspaces/:workspaceId/_menuDialog/OperationDialogOpenProvider";
import { ReactNode, useContext } from "react";

export function XlsxImportDialog({
  TriggerComponent,
}: {
  TriggerComponent?: ReactNode;
}) {
  // const [opened, setOpen] = useState(false);
  const { workspaceId } = useWorkspaceDetail();
  const { handleLoadXlsx, parseXlsx } = useXlsx(workspaceId);

  const { openXlsxImport, isShowXlsxImport } = useContext(
    OperationDialogContext
  );

  return (
    <Dialog open={isShowXlsxImport} onOpenChange={openXlsxImport}>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>엑셀에서 데이터 불러오기</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">엑셀 불러오기</Label>
          <Input
            id="picture"
            type="file"
            onChange={async (e) => {
              const data = await handleLoadXlsx(e);
              if (data) {
                parseXlsx(data);
                openXlsxImport(false);
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button>저장하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
