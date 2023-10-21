import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/index";
import { LANGUAGES, LanguageType } from "@/language/@data/Language";
import { useMultiStagger } from "@/lib/animate/useMultiStagger";
import { useCurrentWorkspaceID } from "@/workspaces/@data/CurrentWorkspaceProvider";
import {
  WorkspaceStep,
  rowNormalizer,
  updateWorkspace,
} from "@/workspaces/@data/workspaceSlice";
import { EntityId } from "@reduxjs/toolkit";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

function useSubmitAnimate({ shouldOpen }: { shouldOpen?: boolean }) {
  return useMemo(() => {
    if (shouldOpen === true) {
      return {
        initial: { y: 40 },
        animate: { y: -20 },
      };
    }
    if (shouldOpen === false) {
      return {
        initial: { y: -20 },
        animate: { y: 60 },
      };
    }
    return {
      initial: { y: 60 },
    };
  }, [shouldOpen]);
}

export function WorkspaceOnBoarding({ entityId }: { entityId: EntityId }) {
  const { currWorkspace } = useCurrentWorkspaceID();
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      title: currWorkspace?.contents?.title ?? "",
      langs: currWorkspace?.contents?.langMeta ?? ([] as LanguageType[]),
    },
  });

  const spring = useSubmitAnimate({
    shouldOpen: form.formState.isDirty ? form.formState.isValid : undefined,
  });
  const [scene1Stagger, scene2Stagger, scene3Stagger] = useMultiStagger([
    { duration: 0.2, startDelay: 0, length: 1 },
    { duration: 0.3, startDelay: 0.3, length: 1 },
    { duration: 0.2, startDelay: 0.1, length: 4 },
  ]);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "#animate1",
      {
        opacity: 1,
        bottom: 0,
      },
      {
        duration: 0.62,
        delay: scene1Stagger,
        type: "spring",
        damping: 10,
      }
    );
    animate(
      "#animate2",
      {
        opacity: 1,
        bottom: 0,
      },
      {
        duration: 0.62,
        delay: scene2Stagger,
        type: "spring",
        damping: 10,
      }
    );
    animate(
      "#animate3",
      {
        opacity: 1,
        bottom: 0,
      },
      {
        duration: 0.62,
        delay: scene3Stagger,
        type: "spring",
        damping: 10,
      }
    );
  }, []);

  return (
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
                langMeta: data.langs.sort((a, b) => a.sort - b.sort),
                title: data.title,
              },
            })
          );
        })}
        className="space-y-6 p-9"
        ref={scope}
      >
        <div>
          <h3 className="text-lg font-medium">워크스페이스 등록하기</h3>
          <p className="text-sm text-muted-foreground">
            워크스페이스의 이름과 관리할 언어 등록합니다.
          </p>
        </div>
        <Separator />
        <FormField
          control={form.control}
          name="title"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem
              id={"animate1"}
              style={{ position: "relative", bottom: -20, opacity: 0 }}
            >
              <FormLabel>워크스페이스 제목</FormLabel>
              <FormControl>
                <Input placeholder="제목 입력" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="space-y-8">
          <FormField
            control={form.control}
            name={"langs"}
            render={() => {
              return (
                <FormItem>
                  <div
                    className="mb-4"
                    id={"animate2"}
                    style={{ opacity: 0, bottom: -20, position: "relative" }}
                  >
                    <FormLabel className="text-base">언어선택</FormLabel>
                    <FormDescription>
                      관리할 언어들을 모두 선택해주세요.
                    </FormDescription>
                  </div>
                  {Object.values(LANGUAGES).map((item, index) => {
                    return (
                      <FormField
                        key={item.key}
                        control={form.control}
                        name="langs"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.key}
                              className="flex flex-row items-start space-x-3 space-y-0"
                              style={{
                                position: "relative",
                                bottom: -30,
                                opacity: 0,
                              }}
                              id={"animate3"}
                            >
                              <FormControl>
                                <Checkbox
                                  checked={
                                    field.value?.find(
                                      (value) => item.key === value.key
                                    )
                                      ? true
                                      : false
                                  }
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value.key !== item.key
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      ></FormField>
                    );
                  })}
                </FormItem>
              );
            }}
          ></FormField>
        </div>
        <div className="fixed z-50 bottom-0 left-1/2 -translate-x-[160px] sm:-translate-x-[0px]">
          <motion.div
            {...spring}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
          >
            <Button size="xl" className="shadow-lg w-[320px]" type="submit">
              제출하기
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  );
}
