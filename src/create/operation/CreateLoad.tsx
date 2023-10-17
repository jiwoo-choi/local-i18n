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
import { useXlsx } from "@/create/external/useXlsx";
import { useFormat } from "@/create/format/useFormat";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

export function CreateLoad() {
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<XLSX.WorkBook | null> => {
    if (!e.target.files || e.target.files.length < 1) {
      return Promise.resolve(null);
    }
    const file = e.target.files[0];
    const promise = new Promise<XLSX.WorkBook>((resolve) => {
      var reader = new FileReader();
      reader.onload = function (e) {
        /* e.target.result is an ArrayBuffer */
        resolve(XLSX.read(e.target?.result));
      };
      reader.readAsArrayBuffer(file);
    });
    return promise;
  };

  const { parseXlsx } = useXlsx();
  const { setData } = useFormat();
  const [opened, setOpen] = useState(false);

  return (
    <Dialog open={opened} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="secondary">데이터 불러오기</Button>
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
              const data = await handleFileChange(e);
              if (data) {
                const formatType = parseXlsx(data);
                setData(formatType);
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
