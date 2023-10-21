import { CurrentWorkspaceIDProvider } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { WorkspaceLayout } from "@/workspaces/WorkspaceLayout";

export default function App() {
  return (
    <CurrentWorkspaceIDProvider>
      <WorkspaceLayout />
    </CurrentWorkspaceIDProvider>
  );
  // return <FormatProvider>{/* <Create /> */}</FormatProvider>;
}
