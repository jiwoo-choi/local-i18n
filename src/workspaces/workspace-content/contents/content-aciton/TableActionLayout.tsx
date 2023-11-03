import { CodeTransform } from "@/workspaces/workspace-content/contents/content-aciton/CodeTransform";
import { TableFindAndReplace } from "@/workspaces/workspace-content/contents/content-aciton/TableFindAndReplace";
import { TableRowDelete } from "@/workspaces/workspace-content/contents/content-aciton/TableRowDelete";

export function TableActionLayout() {
  return (
    <div className="flex justify-between py-4 pb-2">
      <div></div>
      <div className="flex space-x-2">
        <CodeTransform />
        <TableFindAndReplace />
        <TableRowDelete />
      </div>
    </div>
  );
}
