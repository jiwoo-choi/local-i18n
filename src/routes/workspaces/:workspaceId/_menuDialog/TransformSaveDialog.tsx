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
import { ReactNode, useContext, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useCurrRowID } from "@/routes/workspaces/:workspaceId/_content/CurrentRowProvider";
import { XLSXExportStrategy, useXlsx } from "@/external/useXlsx";
import { CodeKeyType } from "@/language/Codes";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { OperationDialogContext } from "@/routes/workspaces/:workspaceId/_menuDialog/OperationDialogOpenProvider";

export function TransformSaveDialog({
  TriggerComponent,
}: {
  TriggerComponent?: ReactNode;
}) {
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState<CodeKeyType>("SPRING_PROPERTIES");

  const { workspaceId } = useWorkspaceDetail();
  const { isShowTransformSave, openTransformSave } = useContext(
    OperationDialogContext
  );
  const { downloadXlsx } = useXlsx(workspaceId);

  return (
    <Dialog open={isShowTransformSave} onOpenChange={openTransformSave}>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>코드 형식으로 변환하여 내보내기</DialogTitle>
          <DialogDescription>
            각 플랫폼에 맞는 코드 형식으로 변환하여 내보냅니다
          </DialogDescription>
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
        <div>
          <Tabs
            className="w-full relative "
            value={tab}
            onValueChange={(e) => setTab(e as typeof tab)}
          >
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="properties">properties</TabsTrigger>
              <TabsTrigger value="translate">translate</TabsTrigger>
              <TabsTrigger value="IM">IM</TabsTrigger>
            </TabsList>
            <TabsContent value="properties">
              <SyntaxHighlighter
                language="javascript"
                style={github}
                customStyle={{ borderRadius: "0.5rem" }}
              >
                {`<spring:message code="example"/>`}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="translate">
              <SyntaxHighlighter
                language="javascript"
                style={github}
                customStyle={{ borderRadius: "0.5rem" }}
              >
                {`t('example')`}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="IM">
              <SyntaxHighlighter
                language="javascript"
                style={github}
                customStyle={{ borderRadius: "0.5rem" }}
              >
                {`IM('example')`}
              </SyntaxHighlighter>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            variant={"default"}
            onClick={() => {
              downloadXlsx({
                title: title,
                exportStrategy: XLSXExportStrategy.WITH_TRANSFORM,
                transformOption: tab,
              });
            }}
          >
            '{tab}' 포맷의 '{title}.xlsx'로 저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
