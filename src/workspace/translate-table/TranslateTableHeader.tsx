import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/index";
import { useCurrRowID } from "@/workspace/@data/CurrentRowProvider";
import { findByWorkspaceIdSelector } from "@/workspaces/@data/workspaceSelectors";

export function TranslateTableHeader() {
  const { workspaceOfRowsId } = useCurrRowID();

  const currentWorkspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceOfRowsId)
  );

  return (
    <TableHeader>
      <TableRow className="content-center">
        <TableHead>key</TableHead>
        {currentWorkspace?.contents?.langs.map((value, index) => {
          return <TableHead key={`${value}_${index}`}>{value}</TableHead>;
        })}
      </TableRow>
    </TableHeader>
  );
}
