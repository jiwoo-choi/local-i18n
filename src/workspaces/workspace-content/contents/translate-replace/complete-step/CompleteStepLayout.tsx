import { useEffect } from "react";

export function CompleteStepLayout() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return <div>completStep</div>;
}
