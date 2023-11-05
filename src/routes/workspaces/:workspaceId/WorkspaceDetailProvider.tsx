import { findByWorkspaceIdSelector } from "@/globalDataQueries";
import { useAppSelector } from "@/index";
import { EntityId } from "@reduxjs/toolkit";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WorkspaceDetailContext = createContext<{
  workspaceId: EntityId;
  currentRowId: EntityId | undefined;
  changeCurrentRowId: (row: EntityId) => void;
}>({
  workspaceId: "",
  currentRowId: "",
  changeCurrentRowId: (id) => {},
});

export function WorkspaceDetailProivder({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: EntityId;
}) {
  const [currRowId, setCurrRowId] = useState<EntityId | undefined>(undefined);
  useEffect(() => {
    setCurrRowId(undefined);
  }, [workspaceId]);
  return (
    <WorkspaceDetailContext.Provider
      value={{
        workspaceId,
        currentRowId: currRowId,
        changeCurrentRowId: setCurrRowId,
      }}
    >
      {children}
    </WorkspaceDetailContext.Provider>
  );
}

export function useWorkspaceDetail() {
  const { workspaceId, changeCurrentRowId, currentRowId } = useContext(
    WorkspaceDetailContext
  );
  const workspace = useAppSelector(findByWorkspaceIdSelector(workspaceId));
  return {
    workspaceId,
    workspace,
    currentRowId,
    changeCurrentRowId,
  };
}
