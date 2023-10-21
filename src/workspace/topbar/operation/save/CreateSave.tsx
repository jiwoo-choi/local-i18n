import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateRawSave } from "@/workspace/topbar/operation/save/CreateRawSave";
import { CreateTransformSave } from "@/workspace/topbar/operation/save/CreateTransformSave";
import { Forward } from "lucide-react";

export function CreateSave() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">
          <Forward className="h-4 w-4 mr-2 shadow-lg" />
          내보내기
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid space-y-2">
        <CreateRawSave />
        <CreateTransformSave />
      </PopoverContent>
    </Popover>
  );
}
