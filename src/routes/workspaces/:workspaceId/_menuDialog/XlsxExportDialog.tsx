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
import { Fragment, ReactNode, useContext, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useCurrRowID } from "@/routes/workspaces/:workspaceId/_content/CurrentRowProvider";
import { useJSON } from "@/external/useJson";
import { useProperties } from "@/external/useProperties";
import { XLSXExportStrategy, useXlsx } from "@/external/useXlsx";
import { Save } from "lucide-react";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { OperationDialogContext } from "@/routes/workspaces/:workspaceId/_menuDialog/OperationDialogOpenProvider";
import { CODES } from "@/language/Codes";

export function XlsxExportDialog({
  TriggerComponent,
}: {
  TriggerComponent?: ReactNode;
}) {
  const { workspaceId } = useWorkspaceDetail();
  const workspaceOfRowsId = workspaceId;
  const { downloadProperties } = useProperties(workspaceOfRowsId);
  const { downloadJson } = useJSON(workspaceOfRowsId);
  const { downloadXlsx } = useXlsx(workspaceOfRowsId);
  const langs = ["ko", "en", "jp", "cn"];
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState<"excel" | "properties" | "json">("excel");
  const { openXlsxExport, isShowXlsxExport } = useContext(
    OperationDialogContext
  );

  return (
    <Dialog open={isShowXlsxExport} onOpenChange={openXlsxExport}>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>번역어 데이터 내보내기</DialogTitle>
          <DialogDescription>저장방식을 선택해주세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1">
          <div className="grid gap-2 mt-2">
            <Label htmlFor="name">파일 제목</Label>
            <Input
              id="name"
              autoFocus
              placeholder="example"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <Tabs
          className="w-full"
          value={tab}
          onValueChange={(e) => {
            setTab(e as "excel" | "properties" | "json");
          }}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="excel">엑셀로 저장</TabsTrigger>
            <TabsTrigger value="properties">Properties로 저장</TabsTrigger>
            <TabsTrigger value="json">JSON으로 저장</TabsTrigger>
          </TabsList>
          <TabsContent value="excel" className="mt-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              아래의 파일명으로 저장..
            </h4>
            <div className="text-sm">{title}.xlsx</div>
          </TabsContent>
          <TabsContent value="properties" className="mt-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              아래의 파일명으로 저장..
            </h4>
            {langs.map((value, index) => {
              return (
                <Fragment key={`${index}_properties`}>
                  <div className="text-sm text-ellipsis w-full">
                    {title}_{value}.properties
                  </div>
                  <Separator className="my-2" />
                </Fragment>
              );
            })}
          </TabsContent>
          <TabsContent value="json" className="mt-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              아래의 파일명으로 저장..
            </h4>
            {langs.map((value, index) => {
              return (
                <Fragment key={`${index}_properties`}>
                  <div className="text-sm text-ellipsis w-full">
                    {title}_{value}.json
                  </div>
                  <Separator className="my-2" />
                </Fragment>
              );
            })}
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button
            onClick={() => {
              switch (tab) {
                case "excel":
                  downloadXlsx({
                    title,
                    exportStrategy: XLSXExportStrategy.DOWNLOAD_ALL,
                  });
                  break;
                case "json":
                  downloadJson(title);
                  break;
                case "properties":
                  downloadProperties(title);
              }
            }}
          >
            내보내기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
