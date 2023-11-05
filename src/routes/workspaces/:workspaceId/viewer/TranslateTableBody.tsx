import { TableBody } from "@/components/ui/table";
import { findByWorkspaceIdSelector } from "@/globalDataQueries";
import { useAppSelector } from "@/index";
import { useWorkspaceDetail } from "@/routes/workspaces/:workspaceId/WorkspaceDetailProvider";
import { TranslateTableBodyRow } from "@/routes/workspaces/:workspaceId/viewer/TranslateTableBodyRow";

export function TranslateTableBody({
  isDeleteMode,
}: {
  isDeleteMode?: boolean;
}) {
  const { workspaceId } = useWorkspaceDetail();
  const currentWorkspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceId)
  );

  return (
    <TableBody>
      {currentWorkspace?.rows.ids?.map((value, index) => {
        return (
          <TranslateTableBodyRow
            rowId={value}
            key={index}
            isDeleteMode={isDeleteMode}
          />
        );
      })}
    </TableBody>
  );
}
