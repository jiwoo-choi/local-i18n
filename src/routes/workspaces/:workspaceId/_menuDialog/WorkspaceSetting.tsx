import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/index";
import { changeLocalStorageSetting } from "@/routes/workspaces/settingSlice";
import { updateWorkspace } from "@/globalDataSlice";
import { useContext, useState } from "react";
import { OperationDialogContext } from "@/routes/workspaces/:workspaceId/_menuDialog/OperationDialogOpenProvider";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";

export function WorkspaceSetting() {
  const { workspace } = useWorkspaceDetail();
  const [title, setTitle] = useState(workspace?.title ?? "");

  const localStorageSave = useAppSelector(
    (state) => state.settingSlice.localStorageSave
  );
  const dispatch = useAppDispatch();
  const [localLSSave, setLocalLSSave] = useState(localStorageSave);
  const { isShowSetting, openSetting } = useContext(OperationDialogContext);

  return (
    <Dialog open={isShowSetting} onOpenChange={openSetting}>
      <DialogTrigger asChild>
        {/* <Button variant="secondary">
          <Settings className="h-4 w-4 mr-2"></Settings>
          설정
        </Button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>워크스페이스 설정</DialogTitle>
          <DialogDescription>
            {workspace?.title}의 워크스페이스 설정
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1">
          <div className="grid gap-2 mt-2">
            <Label htmlFor="name">워크스페이스 제목</Label>
            <Input
              id="name"
              autoFocus
              placeholder="example"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="ls-usage" className="flex flex-col space-y-1">
            <span>local storage 사용하기</span>
            <span className="font-normal leading-snug text-muted-foreground">
              변경사항을 브라우저의 local storage에 저장합니다.
            </span>
          </Label>
          <Switch
            id="ls-usage"
            checked={localLSSave}
            onCheckedChange={(e) => setLocalLSSave(e)}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              if (!workspace) {
                return openSetting(false);
              }
              dispatch(changeLocalStorageSetting(localLSSave));
              dispatch(
                updateWorkspace({
                  ...workspace,
                  title: title,
                })
              );
              openSetting(false);
            }}
          >
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
