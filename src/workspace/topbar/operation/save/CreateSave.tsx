import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fragment, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJSON } from "@/workspace/topbar/external/useJson";
import { useProperties } from "@/workspace/topbar/external/useProperties";
import {
  XLSXExportStrategy,
  useXlsx,
} from "@/workspace/topbar/external/useXlsx";
import { Forward } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateRawSave } from "@/workspace/topbar/operation/save/CreateRawSave";
import { CreateTransformSave } from "@/workspace/topbar/operation/save/CreateTransformSave";

export function CreateSave() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="default">
          <Forward className="h-4 w-4 mr-2 shadow-lg" />
          내보내기
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col grid space-y-2">
        <CreateRawSave />
        <CreateTransformSave />
      </PopoverContent>
    </Popover>
  );
}
