import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/index";
import { useCurrRowID } from "@/workspaces/workspace-content/contents/translate-table/@data/CurrentRowProvider";
import { findByWorkspaceIdSelector } from "@/workspaces/@data/workspaceSelectors";
import { useMemo } from "react";

export function TranslateTableHeader({
  isDeleteMode = false,
}: {
  isDeleteMode?: boolean;
}) {
  const { workspaceOfRowsId } = useCurrRowID();

  const currentWorkspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceOfRowsId)
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
