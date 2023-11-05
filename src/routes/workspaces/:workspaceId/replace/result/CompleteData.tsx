import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/index";
import { translateReplaceChangeAdaterSelectors } from "@/routes/workspaces/:workspaceId/replace/translateReplaceChangeSlice";
import { columns } from "@/routes/workspaces/:workspaceId/replace/result/columns";
function getWidth(accessorKey?: string) {
  switch (accessorKey) {
    case "select":
      return 35;
    case "langKey":
      return 120;
    default:
      return undefined;
  }
}

export function CompleteData() {
  const { ids, entities } = useAppSelector(
    (state) => state.translateReplaceChangeSlice
  );
  const table = useAppSelector((state) =>
    translateReplaceChangeAdaterSelectors.selectAll(
      state.translateReplaceChangeSlice
    )
  );
  const dispatch = useAppDispatch();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((value, index) => {
              return (
                <TableHead
                  key={`$header_${index}`}
                  style={{
                    width: getWidth(value.accessorKey),
                  }}
                >
                  {value.header?.({ dispatch, table })}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ids.map((entityId, index) => {
            return (
              <TableRow>
                {columns.map((value) => {
                  const row = entities[entityId];
                  if (!row) {
                    return null;
                  }
                  return (
                    <TableCell
                      key={`${value.accessorKey}_${index}_${entityId}`}
                    >
                      <>{value.cell?.({ dispatch, row: row })}</>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
