import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/index";
import { LanguageKeyType } from "@/language/@data/Language";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import {
  translateConditionAdapterSelectors,
  updateCondition,
} from "@/workspaces/workspace-content/contents/translate-replace/@data/translateConditionSlice";
import { EntityId } from "@reduxjs/toolkit";
import { useId } from "react";

export function ConditionCard({
  entityId,
  index,
}: {
  entityId: EntityId;
  index: number;
}) {
  const dispatch = useAppDispatch();
  const condition = useAppSelector((state) =>
    translateConditionAdapterSelectors.selectById(
      state.translateConditionSlice,
      entityId
    )
  );
  const { currWorkspace } = useCurrentWorkspaceID();
  const metas = currWorkspace?.contents?.langMeta;
  const id = useId();
  return (
    <Card>
      <CardHeader>
        <CardTitle>조건 {index}</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>아래 언어에서</Label>
        <Select
          value={condition?.langKey}
          onValueChange={(langKey: LanguageKeyType) => {
            dispatch(
              updateCondition({
                ...condition,
                entityId: entityId,
                langKey: langKey,
              })
            );
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="언어" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>언어</SelectLabel>
              {metas?.map((value) => {
                return (
                  <SelectItem value={value.key} key={`${value.key}_${id}`}>
                    {value.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label htmlFor={`${id}_keyword`}>아래 키워드를 만나면..</Label>
        <Input
          onChange={(e) => {
            dispatch(
              updateCondition({
                ...condition,
                entityId: entityId,
                targetKeyword: e.target.value,
              })
            );
          }}
          value={condition?.targetKeyword}
          id={`${id}_keyword`}
        />
        <Label htmlFor={`${id}_change`}>다음과 같이 변경할게요..</Label>
        <Input
          onChange={(e) => {
            console.log(condition);
            dispatch(
              updateCondition({
                ...condition,
                entityId: entityId,
                replaceKeyword: e.target.value,
              })
            );
          }}
          value={condition?.replaceKeyword}
          id={`${id}_change`}
        />
        {/* <div className="flex items-center space-x-2">
          <Switch id={`${id}_airplane-mode`} />
          <Label htmlFor={`${id}_airplane-mode`}>무조건 변경합니다</Label>
        </div> */}
      </CardContent>
    </Card>
  );
}
