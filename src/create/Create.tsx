import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateLoad } from "@/create/operation/CreateLoad";
import { CreateRow } from "@/create/CreateRow";
import { CreateSave } from "@/create/operation/CreateSave";
import { useFormat } from "@/create/format/useFormat";
import { useFormatLocalStorage } from "@/create/format/useFormatLocalStorage";
import { Plus } from "lucide-react";
import { CreateClear } from "@/create/operation/CreateClear";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Create() {
  const { dataSaveOnLocalStorage, setDataSaveOnLocalStorage } =
    useFormatLocalStorage();
  const { data, keyList, saveFormat } = useFormat();
  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">번역어 관리</h2>
          <div className="ml-auto flex space-x-2 sm:justify-end">
            <div className="flex items-center space-x-2 mr-3">
              <Switch
                id="airplane-mode"
                checked={dataSaveOnLocalStorage}
                onCheckedChange={(e) => {
                  setDataSaveOnLocalStorage(e);
                }}
              />
              <Label htmlFor="airplane-mode">localStorage 저장</Label>
            </div>
            <CreateClear />
            <CreateLoad />
            <CreateSave />
            {/** click할 경우 ref에서 다 가져와야한다. */}
            <div className="hidden space-x-2 md:flex"></div>
          </div>
        </div>
        <Separator></Separator>
        <div className="container py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">key</TableHead>
                <TableHead>KO</TableHead>
                <TableHead>EN</TableHead>
                <TableHead>JP</TableHead>
                <TableHead>CN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keyList.map((item) => {
                return <CreateRow key={item} idKey={item} />;
              })}
              <TableRow>
                <TableCell colSpan={4} className="flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      saveFormat(Date.now().toString(), {
                        ko: "",
                        en: "",
                        jp: "",
                        cn: "",
                        key: "",
                      });
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
