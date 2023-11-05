import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/index";
import { findByWorkspaceIdSelector } from "@/globalDataQueries";
import { useMemo } from "react";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";

export function TranslateTableHeader({
  isDeleteMode = false,
}: {
  isDeleteMode?: boolean;
}) {
  const { workspaceId } = useWorkspaceDetail();
  const currentWorkspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceId)
  );
  const languageMeta = useMemo(() => {
    return [...(currentWorkspace?.contents?.langMeta ?? [])].sort((a, b) => {
      return a.sort - b.sort;
    });
  }, [currentWorkspace]);
  return (
    <TableHeader>
      <TableRow className="content-center">
        {isDeleteMode && (
          <TableHead className="w-[30px]">
            <div>delt</div>
          </TableHead>
        )}
        <TableHead>key</TableHead>
        {languageMeta?.map((value, index) => {
          return <TableHead key={`${value}_${index}`}>{value.name}</TableHead>;
        })}
      </TableRow>
    </TableHeader>
  );
}
