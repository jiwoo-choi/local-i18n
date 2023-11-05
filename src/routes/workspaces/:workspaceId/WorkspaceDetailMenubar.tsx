import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { OperationDialogContext } from "@/routes/workspaces/:workspaceId/_menuDialog/OperationDialogOpenProvider";
import { useContext } from "react";
import { useNavigate } from "react-router";

export function WorkspaceDetailMenuBar() {
  const { workspaceId } = useWorkspaceDetail();
  const navigate = useNavigate();

  const { openXlsxExport, openXlsxImport, openTransformSave, openSetting } =
    useContext(OperationDialogContext);

  return (
    <Menubar className="border-0">
      <MenubarMenu>
        <MenubarTrigger>워크스페이스</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => openSetting(true)}>
            워크스페이스 설정
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>번역어 편집</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              navigate(`/workspaces/${workspaceId}/replace`);
            }}
          >
            번역어 text 일괄 변경
          </MenubarItem>
          <MenubarItem
            onClick={() => {
              navigate(`/workspaces/${workspaceId}/delete`);
            }}
          >
            번역어 삭제
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>도구</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              navigate(`/workspaces/${workspaceId}/transform`);
            }}
          >
            코드에서 번역어로 변환하여 보기
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>불러오기/내보내기</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => openXlsxImport(true)}>
            불러오기
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>내보내기</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => openXlsxExport(true)}>
                파일로 내보내기
              </MenubarItem>
              <MenubarItem onClick={() => openTransformSave(true)}>
                코드 형태로 변환해서 내보내기
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
