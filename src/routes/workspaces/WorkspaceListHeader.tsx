import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router";
export function WorkspaceListHeader({
  isDeleteMode,
  changeDeleteMode,
}: {
  isDeleteMode: boolean;
  changeDeleteMode: (a: boolean) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div>
        <h3 className="text-lg font-medium">워크스페이스 목록</h3>
        <p className="text-sm text-muted-foreground">
          등록한 워크스페이스 목록을 보여줍니다.
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {!isDeleteMode ? (
          <>
            <Button
              variant={"secondary"}
              onClick={() => {
                changeDeleteMode(true);
              }}
            >
              <Trash className="h-4 w-4 mr-2"></Trash>
              삭제모드
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => {
                navigate("/create");
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              워크스페이스 추가하기
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={"outline"}
              onClick={() => {
                changeDeleteMode(false);
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2"></ArrowLeft>
              취소하고 뒤로가기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
