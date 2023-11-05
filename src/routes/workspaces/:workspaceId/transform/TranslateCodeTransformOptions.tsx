import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CODES, CodeKeyType } from "@/language/Codes";
import { LanguageKeyType } from "@/language/Language";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { TranslateCodeTransformLayoutContext } from "@/routes/workspaces/:workspaceId/transform/TranslateCodeTransformContext";
import { useContext } from "react";

export function TranslateCodeTransformOption() {
  const { workspace } = useWorkspaceDetail();

  const {
    currentCodeKey,
    setCurrentCodeKey,
    setCurrentTargetLangKey,
    currentTargetLangKey,
  } = useContext(TranslateCodeTransformLayoutContext);

  return (
    <div className="flex flex-row gap-4">
      <div>
        <Label>코드에 적혀있는 언어</Label>
        <Select
          value={currentTargetLangKey}
          onValueChange={(value) =>
            setCurrentTargetLangKey(value as LanguageKeyType)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {workspace?.contents?.langMeta.map((value) => {
              return (
                <SelectItem key={value.key} value={value.key}>
                  {value.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>코드 변환 포맷</Label>
        <Select
          value={currentCodeKey}
          onValueChange={(value) => {
            setCurrentCodeKey(value as CodeKeyType);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(CODES).map((value) => {
              return (
                <SelectItem key={value.key} value={value.key}>
                  {value.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
