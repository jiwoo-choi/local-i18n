import { WorkspaceLayout } from "@/workspaces/WorkspaceLayout";
import { CurrentWorkspaceIDProvider } from "@/workspaces/@data/CurrentWorkspaceProvider";

export default function App() {
  return (
    <CurrentWorkspaceIDProvider>
      <WorkspaceLayout />
    </CurrentWorkspaceIDProvider>
  );
  // return <FormatProvider>{/* <Create /> */}</FormatProvider>;
}
