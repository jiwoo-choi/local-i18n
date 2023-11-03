import { ReactNode, createContext, useContext, useState } from "react";

export enum WorkspaceMode {
  DELETE,
  VIEW,
  MODIFY,
  CODE_TRANSFORM,
}
const CurrentWorksapceContext = createContext<{
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (workspace: WorkspaceMode) => void;
}>({
  workspaceMode: WorkspaceMode.VIEW,
  setWorkspaceMode: () => {},
});

export function CurrentWorkspaceModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [workspaceMode, setWorkspaceMode] = useState(WorkspaceMode.VIEW);

  return (
    <CurrentWorksapceContext.Provider
      value={{ workspaceMode, setWorkspaceMode }}
    >
      {children}
    </CurrentWorksapceContext.Provider>
  );
}

export function useCurrentWorkspaceMode() {
  return useContext(CurrentWorksapceContext);
}
