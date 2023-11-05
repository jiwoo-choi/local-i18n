import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { WorkspaceStep, addWorkspace, rowNormalizer } from "@/globalDataSlice";
import { useAppDispatch } from "@/index";
import { LanguageType } from "@/language/Language";
import { WorkspaceCreateForm } from "@/routes/create/WorkspaceCreateForm";
import { WorkspaceCreateHeader } from "@/routes/create/WorkspaceCreateHeader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
export function Layout() {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      langs: [] as LanguageType[],
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
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
          navigate(`/workspaces`, { replace: true });
        })}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col p-6 gap-5">
          <WorkspaceCreateHeader />
          <Separator />
          <WorkspaceCreateForm />
        </div>
      </form>
    </Form>
  );
}
