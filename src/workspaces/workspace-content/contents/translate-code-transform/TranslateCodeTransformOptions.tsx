import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CODES, CodeKeyType } from "@/language/@data/Codes";
import { LANGUAGES, LanguageKeyType } from "@/language/@data/Language";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import { TranslateCodeTransformLayoutContext } from "@/workspaces/workspace-content/contents/translate-code-transform/TranslateCodeTransformContext";
import { useContext } from "react";

export function TranslateCodeTransformOption() {
  const { currWorkspace } = useCurrentWorkspaceID();

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
            {currWorkspace?.contents?.langMeta.map((value) => {
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
