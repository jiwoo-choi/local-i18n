import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WorkspaceStep, addWorkspace, rowNormalizer } from "@/globalDataSlice";
import { useAppDispatch } from "@/index";
import { LANGUAGES, LanguageType } from "@/language/Language";
import { useMultiStagger } from "@/lib/animate/useMultiStagger";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export function WorkspaceCreateForm() {
  const dispatch = useAppDispatch();
  const methods = useFormContext<{
    langs: LanguageType[];
    title: string;
  }>();
  const navigate = useNavigate();

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
    <form
      onSubmit={methods.handleSubmit((data) => {
        const id = Date.now().toString();
        dispatch(
          addWorkspace({
            rows: rowNormalizer.getInitialState(),
            step: WorkspaceStep.CREATED,
            id: id,
            title: data.title,
            contents: {
              langMeta: data.langs.sort((a, b) => a.sort - b.sort),
              title: data.title,
            },
          })
        );
        navigate(`workspaces/${id}`);
      })}
      className="flex flex-col gap-6"
      ref={scope}
    >
      <FormField
        control={methods.control}
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
          control={methods.control}
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
                      control={methods.control}
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
    </form>
  );
}
