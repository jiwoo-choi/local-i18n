import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrRowID } from "@/workspace/@data/CurrentRowProvider";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function AsideBar() {
  const { currRow } = useCurrRowID();

  if (!currRow) {
    return null;
  }
  return (
    <>
      <div className="relative h-screen bg-background inset-y-0 right-0 hidden lg:block min-w-[420px]"></div>
      <div
        className="fixed top-[63px] h-screen gap-4 bg-background p-6 shadow-lg inset-y-0 right-0 border-l hidden lg:block w-[420px] space-y-6"
        style={{ height: "calc(100% - 63px)" }}
      >
        <section>
          <h2 className="text-xl font-semibold text-foreground pb-2">
            코드변환
          </h2>
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
                {`<spring:message code="${currRow.langs.key}"/>`}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="translate">
              <SyntaxHighlighter
                language="javascript"
                style={github}
                customStyle={{ borderRadius: "0.5rem" }}
              >
                {`t('${currRow.langs.key}')`}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="IM">
              <SyntaxHighlighter
                language="javascript"
                style={github}
                customStyle={{ borderRadius: "0.5rem" }}
              >
                {`IM('${currRow.langs.key}')`}
              </SyntaxHighlighter>
            </TabsContent>
          </Tabs>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground pb-2">
            단어 검색
          </h2>
          <div className="space-y-2">
            {Object.keys(currRow.langs).map((value, index) => {
              if (value === "key") {
                return null;
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
    </>
  );
}
