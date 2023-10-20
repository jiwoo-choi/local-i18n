import { useAppSelector } from "@/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";

export function AsideBar() {
  // 현재 클릭한 asidebar가 있는지
  const currentRow = useAppSelector(
    (state) => state.workspaceSlice.currentWorkspace?.currentRow
  );
  if (!currentRow) {
    return null;
  }
  return (
    <div
      className="relative h-screen gap-4 bg-background p-6 shadow-lg inset-y-0 right-0 border-l hidden lg:block w-[420px] space-y-6"
      style={{ height: "calc(100% - 63px)" }}
    >
      <section>
        <h2 className="text-xl font-semibold text-foreground pb-2">코드변환</h2>
        <Tabs defaultValue="properties" className="w-[360px] relative ">
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
              {`<spring:message code=\"${currentRow.langs.key}\"/>`}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent value="translate">
            <SyntaxHighlighter
              language="javascript"
              style={github}
              customStyle={{ borderRadius: "0.5rem" }}
            >
              {`t('${currentRow.langs.key}')`}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent value="IM">
            <SyntaxHighlighter
              language="javascript"
              style={github}
              customStyle={{ borderRadius: "0.5rem" }}
            >
              {`IM('${currentRow.langs.key}')`}
            </SyntaxHighlighter>
          </TabsContent>
        </Tabs>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-foreground pb-2">
          단어 검색
        </h2>
        <div className="space-y-2">
          {Object.keys(currentRow.langs).map((value, index) => {
            if (value === "key") {
              return;
            }
            return (
              <Button className="flex w-[70px]" variant={"secondary"}>
                {value}
              </Button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
