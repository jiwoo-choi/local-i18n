import { TranslateCodeTransformContents } from "@/workspaces/workspace-content/contents/translate-code-transform/TranslateCodeTransformContents";
import { TranslateCodeTransrformProvider } from "@/workspaces/workspace-content/contents/translate-code-transform/TranslateCodeTransformContext";
import { TranslateCodeTransformOption } from "@/workspaces/workspace-content/contents/translate-code-transform/TranslateCodeTransformOptions";

/**∏
 * 한국어 타겟으로 검색.
 * 데이터가 한국어가 있다면 한국어로 변경.
 * id 중복 방지 필수!
 * @returns
 */

export function TranslateCodeTransformLayout() {
  return (
    <TranslateCodeTransrformProvider>
      <div className="flex gap-2 flex-col p-3 w-full h-full">
        <TranslateCodeTransformOption />
        <TranslateCodeTransformContents />
      </div>
    </TranslateCodeTransrformProvider>
  );
}
