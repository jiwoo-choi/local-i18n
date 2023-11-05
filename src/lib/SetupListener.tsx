import { startAppListening } from "@/index";
import { setUpWorkspaceListener } from "@/globalDataSlice";
import { useEffect } from "react";

export function SetUpListener() {
  useEffect(() => {
    return setUpWorkspaceListener(startAppListening);
  }, []);
  return null;
}
