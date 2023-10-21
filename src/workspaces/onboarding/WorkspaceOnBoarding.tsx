import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/index";
import { cn } from "@/lib/utils";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import {
  WorkspaceStep,
  rowNormalizer,
  updateWorkspace,
} from "@/workspaces/@data/workspaceSlice";
import { EntityId } from "@reduxjs/toolkit";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";

function useSubmitAnimate({
  shouldOpen,
  isDirty,
}: {
  shouldOpen: boolean;
  isDirty: boolean;
}) {
  return useMemo(() => {
    if (!isDirty) {
      return {
        initial: false,
        style: { display: "none" },
      };
    }
    if (shouldOpen) {
      return {
        initial: { y: 40 },
        animate: { y: -20 },
      };
    }
    if (!shouldOpen) {
      return {
        initial: { y: -20 },
        animate: { y: 60 },
      };
    }
    return {
      initial: false,
      style: { display: "none" },
    };
  }, [shouldOpen, isDirty]);
}

export function WorkspaceOnBoarding({ entityId }: { entityId: EntityId }) {
  const { currWorkspace } = useCurrentWorkspaceID();
  const dispatch = useAppDispatch();
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      langs: currWorkspace?.contents?.langs ?? [
        { value: "ko" },
        { value: "en" },
        { value: "cn" },
        { value: "jp" },
      ],
      title: currWorkspace?.contents?.title ?? "",
    },
  });
  const { fields } = useFieldArray({
    name: "langs",
    control: form.control,
    rules: { minLength: 2 },
  });
  const isDirty = useMemo(() => {
    const langs =
      form.formState.touchedFields.langs?.some((value) => value) ?? false;
    const title = form.formState.touchedFields.title ?? false;
    return form.formState.isDirty && langs && title;
  }, [form.formState]);
  const spring = useSubmitAnimate({
    shouldOpen: form.formState.isValid,
    isDirty: isDirty,
  });

  return (
    <div className="space-y-6 p-9 relative">
      <div>
        <h3 className="text-lg font-medium">워크스페이스 등록하기</h3>
        <p className="text-sm text-muted-foreground">
          워크스페이스 이름과 필요 언어 등록하기.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            dispatch(
              updateWorkspace({
                rows: rowNormalizer.getInitialState(),
                step: WorkspaceStep.CREATED,
                id: entityId,
                title: data.title,
                contents: {
                  langs: data.langs.map((value) =>
                    typeof value === "object" ? value.value : value
                  ),
                  title: data.title,
                },
              })
            );
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>워크스페이스 타이틀</FormLabel>
                <FormControl>
                  <Input placeholder="제목 입력" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            {fields.map((field, index) => {
              return (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`langs.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        언어 선택
                      </FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Checkbox {...field} />
                        </FormControl>
                        <FormLabel className={cn("ml-2")}>
                          {field.value}
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
          {/* {fields.map((field, index) => {
              return (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`langs.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        언어 추가하기
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        사용할 언어를 추가합니다.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })} */}
          {/* <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button> */}
          <motion.div
            className="fixed z-50 bottom-0 left-1/2 lg:right-1/2 -translate-x-1/2 shadow-lg"
            {...spring}
          >
            <Button size="lg" className="w-[272px] shadow-lg">
              제출하기
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
}
