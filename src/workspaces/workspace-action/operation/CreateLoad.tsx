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
import { useCurrRowID } from "@/workspaces/workspace-content/contents/translate-table/@data/CurrentRowProvider";
import { useXlsx } from "@/external/useXlsx";
import { FolderInput } from "lucide-react";
import { useState } from "react";

export function CreateLoad() {
  const [opened, setOpen] = useState(false);
  const { workspaceOfRowsId } = useCurrRowID();
  const { handleLoadXlsx, parseXlsx } = useXlsx(workspaceOfRowsId);

  return (
    <Dialog open={opened} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="default" className="shadow-md">
          <FolderInput className="h-4 w-4 mr-2" />
          불러오기
        </Button>
      </DialogTrigger>
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
                setOpen(false);
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => {}}>저장하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
