import { startAppListening } from "@/index";
import { CurrentWorkspaceIDProvider } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { WorkspaceLayout } from "@/workspaces/WorkspaceLayout";
import { setUpTranslateReplaceSlice } from "@/workspaces/workspace-content/contents/translate-replace/@data/translateConditionSlice";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    return setUpTranslateReplaceSlice(startAppListening);
  }, []);
  return (
    <CurrentWorkspaceIDProvider>
      <WorkspaceLayout />
    </CurrentWorkspaceIDProvider>
  );
  // return <FormatProvider>{/* <Create /> */}</FormatProvider>;
}
