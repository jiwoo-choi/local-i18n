import { TableFindAndReplace } from "@/workspaces/workspace-action/content-aciton/TableFindAndReplace";
import { TableRowDelete } from "@/workspaces/workspace-action/content-aciton/TableRowDelete";

export function TableActionLayout() {
  return (
    <div className="flex justify-between py-4 pb-2">
      <div></div>
      <div className="flex space-x-2">
        <TableFindAndReplace />
        <TableRowDelete />
      </div>
    </div>
  );
}
