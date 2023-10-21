import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/index";
import { useCurrRowID } from "@/workspace/@data/CurrentRowProvider";
import { findByWorkspaceIdSelector } from "@/workspaces/@data/workspaceSelectors";
import { useMemo } from "react";

export function TranslateTableHeader() {
  const { workspaceOfRowsId } = useCurrRowID();

  const currentWorkspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceOfRowsId)
  );
  const languageMeta = useMemo(() => {
    return [...(currentWorkspace?.contents?.langMeta ?? [])].sort((a, b) => {
      console.log(a, b);
      return a.sort - b.sort;
    });
  }, [currentWorkspace]);
  console.log(languageMeta);
  return (
    <TableHeader>
      <TableRow className="content-center">
        <TableHead>key</TableHead>
        {languageMeta?.map((value, index) => {
          return <TableHead key={`${value}_${index}`}>{value.name}</TableHead>;
        })}
      </TableRow>
    </TableHeader>
  );
}
