import { TableBody } from "@/components/ui/table";
import { useAppSelector } from "@/index";
import { useCurrRowID } from "@/workspace/@data/CurrentRowProvider";
import { TranslateTableBodyRow } from "@/workspace/translate-table/TranslateTableBodyRow";
import { findByWorkspaceIdSelector } from "@/workspaces/@data/workspaceSelectors";

export function TranslateTableBodyLayout() {
  const { workspaceOfRowsId } = useCurrRowID();
  const currentWorkspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceOfRowsId)
  );

  return (
    <TableBody>
      {currentWorkspace?.rows.ids?.map((value, index) => {
        return <TranslateTableBodyRow rowId={value} key={index} />;
      })}
    </TableBody>
  );
}
