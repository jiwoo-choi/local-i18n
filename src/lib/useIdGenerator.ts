import { EntityId } from "@reduxjs/toolkit";
import { useCallback, useId } from "react";

export function useIdGenerator() {
  const hookId = useId();
  return useCallback((id: EntityId, index: number, prefix: string = "") => {
    return `${prefix}_${hookId}_${id}_${index}`;
  }, []);
}
