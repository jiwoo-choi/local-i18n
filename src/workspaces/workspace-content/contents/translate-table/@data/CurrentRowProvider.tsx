import { useAppSelector } from "@/index";
import { findByRowIdSelector } from "@/workspaces/@data/workspaceSelectors";
import { EntityId } from "@reduxjs/toolkit";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CurrentRowIDContext = createContext<{
  workspaceOfRowsId: EntityId;
  currRowId?: EntityId;
  setCurrRowId: (entity: EntityId) => void;
}>({
  workspaceOfRowsId: "",
  currRowId: undefined,
  setCurrRowId: () => {},
});

export function CurrentRowIDProvider({
  children,
  ...props
}: {
  workspaceId?: EntityId;
  children: ReactNode;
}) {
  const [_wId] = useState(props.workspaceId);
  const [error, setError] = useState<Error | null>(null);
  const [currRowId, setCurrRowId] = useState<EntityId | undefined>(undefined);
  useEffect(() => {
    if (_wId === "") {
      setError(new Error("workspace key가 주어지지 않았습니다."));
    }
  }, [_wId]);
  if (error) {
    throw error;
  }
  if (!_wId) {
    return null;
  }
  return (
    <CurrentRowIDContext.Provider
      value={{
        workspaceOfRowsId: _wId!,
        currRowId,
        setCurrRowId,
      }}
    >
      {children}
    </CurrentRowIDContext.Provider>
  );
}

export function useCurrRowID() {
  const { workspaceOfRowsId, currRowId, setCurrRowId } =
    useContext(CurrentRowIDContext);
  const currRowSelector = findByRowIdSelector(workspaceOfRowsId, currRowId);
  const currRow = useAppSelector(currRowSelector);
  return {
    workspaceOfRowsId: workspaceOfRowsId,
    currRowId,
    goToRow: (id: EntityId) => setCurrRowId(id),
    currRowSelector,
    currRow,
  };
}
