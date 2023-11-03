import { Textarea } from "@/components/ui/textarea";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { useEffect, useState, useTransition } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

/**
 * 한국어 타겟으로 검색.
 * 데이터가 한국어가 있다면 한국어로 변경.
 * id 중복 방지 필수!
 * @returns
 */
export function TranslateCodeTransformLayout() {
  const [state, setState] = useState("");
  const { currWorkspace } = useCurrentWorkspaceID();

  const [isPending, startTransition] = useTransition();
  const [translatedState, setTranslatedState] = useState("");

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
        const lang = row.langs["KO"];
        if (!lang) {
          return;
        }
        currentState = currentState.replaceAll(lang, `t('${row.key}')`);
      });
      setTranslatedState(currentState);
    });
  }, [state, currWorkspace?.rows]);
  return (
    <>
      <Textarea onChange={(e) => setState(e.target.value)}></Textarea>
      {isPending && <div>loading..</div>}
      <SyntaxHighlighter
        language="javascript"
        style={github}
        customStyle={{ borderRadius: "0.5rem" }}
      >
        {translatedState}
      </SyntaxHighlighter>
    </>
  );
}
