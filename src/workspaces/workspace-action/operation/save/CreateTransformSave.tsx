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
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrRowID } from "@/workspaces/workspace-content/contents/translate-table/@data/CurrentRowProvider";
import {
  CodeTransformOption,
  XLSXExportStrategy,
  useXlsx,
} from "@/external/useXlsx";
import { Code } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function CreateTransformSave() {
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState<"properties" | "im" | "translate">(
    "properties"
  );

  const { workspaceOfRowsId } = useCurrRowID();
  const { downloadXlsx } = useXlsx(workspaceOfRowsId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Code className="h-4 w-4 mr-2 shadow-lg" />
          코드 형태로 내보내기
        </Button>
      </DialogTrigger>
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
              const transformOption: Record<typeof tab, CodeTransformOption> = {
                im: CodeTransformOption.IM,
                properties: CodeTransformOption.SPRING_PROPERTIES,
                translate: CodeTransformOption.NEXT_TRANSLATE,
              };

              downloadXlsx({
                title: title,
                exportStrategy: XLSXExportStrategy.WITH_TRANSFORM,
                transformOption: transformOption[tab],
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
