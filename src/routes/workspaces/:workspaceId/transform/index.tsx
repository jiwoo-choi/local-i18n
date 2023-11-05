import { TranslateCodeTransrformProvider } from "@/routes/workspaces/:workspaceId/transform/TranslateCodeTransformContext";
import { TranslateCodeTransformLayout } from "@/routes/workspaces/:workspaceId/transform/TranslateCodeTransformLayout";

export function Layout() {
  return (
    <TranslateCodeTransrformProvider>
      <TranslateCodeTransformLayout />
    </TranslateCodeTransrformProvider>
  );
}
