import { Button } from "@/components/ui/button";
import { useFormat } from "@/create/format/useFormat";

export function CreateClear() {
  const { clearAll } = useFormat();

  return (
    <Button variant="secondary" onClick={clearAll}>
      초기화하기
    </Button>
  );
}
