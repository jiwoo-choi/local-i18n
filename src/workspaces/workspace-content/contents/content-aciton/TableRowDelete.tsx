import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export function TableRowDelete() {
  return (
    <Button variant={"destructive"}>
      <Trash className="h-4 w-4 mr-1" />
      삭제모드
    </Button>
  );
}
