import { TableBody } from "@/components/ui/table";
import { useAppSelector } from "@/index";
import { useCurrRowID } from "@/workspaces/workspace-content/contents/translate-table/@data/CurrentRowProvider";
import { TranslateTableBodyRow } from "@/workspaces/workspace-content/contents/translate-table/TranslateTableBodyRow";
import { findByWorkspaceIdSelector } from "@/workspaces/@data/workspaceSelectors";

export function TranslateTableBodyLayout({
  isDeleteMode,
}: {
  isDeleteMode?: boolean;
}) {
  const { workspaceOfRowsId } = useCurrRowID();
  const currentWorkspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceOfRowsId)
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
