import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { workspaceNormalizerSelectors } from "@/globalDataQueries";
import { useAppSelector } from "@/index";
import { cn } from "@/lib/utils";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { CheckIcon, ChevronsUpDown, Layers } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function WorkspaceDetailChanger() {
  const { workspace, workspaceId } = useWorkspaceDetail();
  const workspaceList = useAppSelector((state) =>
    workspaceNormalizerSelectors.selectAll(state.globalDataSlice.workspaceList)
  );

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("w-[200px] justify-between")}
        >
          <div className="flex items-center">
            <Layers className="mr-2 h-4 w-4" />
            {workspace?.title}
          </div>
          <ChevronsUpDown className="h-3 w-3 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="워크스페이스 검색..." />
            <CommandEmpty>검색된 워크스페이스가 없습니다</CommandEmpty>
            <CommandGroup key={"workspace"} heading={"워크스페이스 목록"}>
              {workspaceList.map((value) => {
                return (
                  <CommandItem
                    key={value.id}
                    onSelect={() => {
                      workspaceId !== value.id &&
                        navigate(`/workspaces/${value.id}`);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <div className="flex items-center">
                      <Layers className="mr-2 h-4 w-4" />
                      {value.title}
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        workspaceId === value.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
