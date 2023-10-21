import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LANGUAGES, LanguageKeyType } from "@/language/@data/Language";
import { cn } from "@/lib/utils";
import { useCurrRowID } from "@/workspace/@data/CurrentRowProvider";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { useMemo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function AsideBar() {
  const { currRow } = useCurrRowID();
  const { currWorkspace } = useCurrentWorkspaceID();

  const PossibleLanguageKeys = useMemo(() => {
    if (!currRow) {
      return [];
    }
    return (Object.keys(currRow.langs) as LanguageKeyType[])
      .filter((key) => !!currRow.langs[key as keyof typeof currRow.langs])
      .filter((item, index) => {
        const included = currWorkspace?.contents?.langMeta.find(
          (value) => value.key === item
        )
          ? true
          : false;
        return included;
      })
      .sort((a, b) => LANGUAGES[a].sort - LANGUAGES[b].sort);
  }, [currRow, currWorkspace]);

  const splitted = useMemo(() => {
    return PossibleLanguageKeys.map((value) => {
      const segmenterFr = new Intl.Segmenter("en", {
        granularity: "word",
      });
      return {
        key: value,
        value: Array.from(
          segmenterFr.segment(currRow?.langs[value] ?? "")[Symbol.iterator]()
        ),
      };
    });
  }, [currRow, PossibleLanguageKeys]);

  if (!currRow) {
    return null;
  }
  return (
    <>
      <div className="relative h-screen bg-background inset-y-0 right-0 hidden lg:block min-w-[420px]"></div>
      <div
        className="fixed top-[63px] h-screen gap-4 bg-background p-6 shadow-lg inset-y-0 right-0 border-l hidden lg:block w-[420px] space-y-9 overflow-y-scroll"
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
                {`<spring:message code="${currRow.key}"/>`}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="translate">
              <SyntaxHighlighter
                language="javascript"
                style={github}
                customStyle={{ borderRadius: "0.5rem" }}
              >
                {`t('${currRow.key}')`}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="IM">
              <SyntaxHighlighter
                language="javascript"
                style={github}
                customStyle={{ borderRadius: "0.5rem" }}
              >
                {`IM('${currRow.key}')`}
              </SyntaxHighlighter>
            </TabsContent>
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
            {splitted.map((value) => {
              return (
                <div>
                  <div className="pb-2">
                    <small className="text-sm font-medium leading-none">
                      {LANGUAGES[value.key].name}
                    </small>
                  </div>
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
                            LANGUAGES[value.key].dicLink.replace(
                              "{{query}}",
                              item.segment
                            ),
                            "PopupWin",
                            "width=600,height=800"
                          );
                        }}
                        href={
                          item.isWordLike
                            ? LANGUAGES[value.key].dicLink.replace(
                                "{{query}}",
                                item.segment
                              )
                            : ""
                        }
                        rel="noreferrer"
                      >
                        {item.segment}
                      </a>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
