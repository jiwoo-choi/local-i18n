import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export function WorkspaceListEmpty() {
  const navigate = useNavigate();

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="text-center grid space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:leading-[1.1] hidden md:block">
          워크스페이스가 없습니다.
        </h1>
        <span className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          새로운 워크스페이스를 추가해보세요.
        </span>
        <Button onClick={() => navigate("/create")}>
          <Plus className="h-4 w-4 mr-1" />
          추가하기
        </Button>
      </div>
    </div>
  );
}
