import { RootState, useAppSelector } from "@/index";
import {
  findByWorkspaceIdSelector,
  workspaceNormalizerSelectors,
} from "@/workspaces/@data/workspaceSelectors";
import { EntityId } from "@reduxjs/toolkit";
import { ReactNode, createContext, useContext, useState } from "react";

const CurrentWorkspaceIDContext = createContext<{
  currWorkspaceId?: EntityId;
  setCurrWorkspaceId: (enttiyId: EntityId) => void;
}>({
  currWorkspaceId: undefined,
  setCurrWorkspaceId: () => {},
});

export function CurrentWorkspaceIDProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currWorkspaceId, setCurrWorkspaceId] = useState<EntityId | undefined>(
    undefined
  );
  return (
    <CurrentWorkspaceIDContext.Provider
      value={{
        currWorkspaceId,
        setCurrWorkspaceId,
      }}
    >
      {children}
    </CurrentWorkspaceIDContext.Provider>
  );
}

export function useCurrentWorkspaceID() {
  const { currWorkspaceId, setCurrWorkspaceId } = useContext(
    CurrentWorkspaceIDContext
  );
  const currWorkspaceSelector = findByWorkspaceIdSelector(currWorkspaceId);
  const currWorkspace = useAppSelector(currWorkspaceSelector);
  return {
    currWorkspaceId,
    goToWorkspace: (id: EntityId) => setCurrWorkspaceId(id),
    currWorkspaceSelector,
    currWorkspace,
  };
}
