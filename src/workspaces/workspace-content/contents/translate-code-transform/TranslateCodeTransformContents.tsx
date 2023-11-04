import { Textarea } from "@/components/ui/textarea";
import { CODES } from "@/language/@data/Codes";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { TranslateCodeTransformLayoutContext } from "@/workspaces/workspace-content/contents/translate-code-transform/TranslateCodeTransformContext";
import { useContext, useEffect, useState, useTransition } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function TranslateCodeTransformContents() {
  const [state, setState] = useState("");
  const { currWorkspace } = useCurrentWorkspaceID();

  const [isPending, startTransition] = useTransition();
  const [translatedState, setTranslatedState] = useState("");

  const { currentCodeKey, currentTargetLangKey } = useContext(
    TranslateCodeTransformLayoutContext
  );

  useEffect(() => {
    startTransition(() => {
      let currentState = state;
      const rows = currWorkspace?.rows;
      if (!rows) {
        setTranslatedState(currentState);
        return;
      }
      rows.ids.forEach((id) => {
        const row = rows.entities[id];
        if (!row) {
          return;
        }
        const lang = row.langs[currentTargetLangKey];
        if (!lang) {
          return;
        }
        currentState = currentState.replaceAll(
          lang,
          CODES[currentCodeKey].makeTransformedCode(row.key)
        );
      });
      setTranslatedState(currentState);
    });
  }, [state, currWorkspace?.rows, currentTargetLangKey, currentCodeKey]);
  return (
    <div className="flex flex-row gap-2 h-full">
      <div className="flex-1 w-0.5 h">
        <Textarea
          className="h-full"
          onChange={(e) => setState(e.target.value)}
        ></Textarea>
      </div>
      <div className="flex-1 w-0.5 ">
        {isPending && <div>코드 적용 중....</div>}
        <SyntaxHighlighter
          className="h-full"
          language="javascript"
          style={github}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          wrapLines={true}
          customStyle={{ borderRadius: "0.5rem" }}
        >
          {translatedState}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
