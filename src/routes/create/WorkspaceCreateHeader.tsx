import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export function WorkspaceCreateHeader() {
  const navigate = useNavigate();

  const { formState } = useFormContext();
  return (
    <div className="flex justify-between">
      <div>
        <h3 className="text-lg font-medium">워크스페이스 등록하기</h3>
        <p className="text-sm text-muted-foreground">
          워크스페이스의 이름과 관리할 언어 등록합니다.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          size={"default"}
          variant={"outline"}
          type={"button"}
          onClick={() => {
            navigate("/workspaces");
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2"></ArrowLeft>
          취소하고 돌아가기
        </Button>
        <Button
          type={"submit"}
          disabled={!formState.isValid}
          size={"default"}
          variant={"default"}
          className="shadow-sm"
        >
          <Send className="h-4 w-4 mr-2" />
          제출하기
        </Button>
      </div>
    </div>
  );
}
