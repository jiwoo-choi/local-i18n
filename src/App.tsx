import { startAppListening } from "@/index";
import { CurrentWorkspaceIDProvider } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { setUpWorkspaceListener } from "@/workspaces/@data/workspaceSlice";
import { WorkspaceLayout } from "@/workspaces/WorkspaceLayout";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    return setUpWorkspaceListener(startAppListening);
  }, []);
  return (
    <CurrentWorkspaceIDProvider>
      <WorkspaceLayout />
    </CurrentWorkspaceIDProvider>
  );
  // return <FormatProvider>{/* <Create /> */}</FormatProvider>;
}
