import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LANGUAGES } from "@/language/Language";
import { useSplitWordFromRow } from "@/language/useSplitWord";
import { cn } from "@/lib/utils";
// import { useCurrRowID } from "@/routes/workspaces/:workspaceId/_content/CurrentRowProvider";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CODES } from "@/language/Codes";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { useAppSelector } from "@/index";
import { findByRowIdSelector } from "@/globalDataQueries";

export function AsideBar() {
  const { currentRowId, workspaceId } = useWorkspaceDetail();
  const currentRow = useAppSelector(
    findByRowIdSelector(workspaceId, currentRowId ?? "")
  );
  const splited = useSplitWordFromRow({
    rowId: currentRowId ?? "",
    workspaceId: workspaceId ?? "",
  });

  if (!currentRow) {
    return null;
  }
  return (
    <>
      <div
        className="fixed top-[57px] h-screen gap-4 bg-background p-6 shadow-lg inset-y-0 right-0 border-l block w-[420px] space-y-9 overflow-y-scroll"
        style={{ height: "calc(100% - 63px)" }}
      >
        <section>
          <div className="pb-2">
            <h2 className="text-xl font-semibold text-foreground pb-1">
              코드변환
            </h2>
            <p className="text-sm text-muted-foreground">
              코드에 바로 적용할 수 있는 형태로 변환해드려요.
            </p>
          </div>
          <Tabs
            defaultValue={CODES.SPRING_PROPERTIES.key}
            className="w-[360px] relative "
          >
            <TabsList className="grid grid-cols-3 w-full mb-4">
              {Object.values(CODES).map((value) => {
                return (
                  <TabsTrigger value={value.key} key={value.key}>
                    {value.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {Object.values(CODES).map((value) => {
              return (
                <TabsContent value={value.key} key={value.key}>
                  <SyntaxHighlighter
                    language="javascript"
                    style={github}
                    customStyle={{ borderRadius: "0.5rem" }}
                  >
                    {value.makeTransformedCode(currentRow.key)}
                  </SyntaxHighlighter>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>
        <section>
          <div className="pb-2">
            <h2 className="text-xl font-semibold text-foreground pb-1">
              단어 검색
            </h2>
            <p className="text-sm text-muted-foreground">
              각 단어별로 어떤 뜻인지 네이버 사전으로 연결해드려요.
            </p>
          </div>
          <div className="grid space-y-4">
            {splited.map((value) => {
              return (
                <div key={value.key}>
                  <div className="pb-2">
                    <small className="text-sm font-medium leading-none">
                      {LANGUAGES[value.key].name}
                    </small>
                  </div>
                  <div>
                    {value.value.map((item) => {
                      //relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold
                      //"hover:underline text-muted-foreground hover:text-foreground hover:shadow-lg hover:font-extrabold"
                      return (
                        <a
                          className={cn(
                            item.isWordLike
                              ? "rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm hover:underline text-muted-foreground hover:text-foreground hover:shadow- hover:font-extrabold"
                              : "text-red-300",
                            ""
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              LANGUAGES[value.key].makeDicLink(item.segment),
                              "PopupWin",
                              "width=600,height=800"
                            );
                          }}
                          href={
                            item.isWordLike
                              ? LANGUAGES[value.key].makeDicLink(item.segment)
                              : ""
                          }
                          rel="noreferrer"
                        >
                          {item.segment}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
