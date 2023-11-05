import { TransformSaveDialog } from "@/routes/workspaces/:workspaceId/_menuDialog/TransformSaveDialog";
import { WorkspaceSetting } from "@/routes/workspaces/:workspaceId/_menuDialog/WorkspaceSetting";
import { XlsxExportDialog } from "@/routes/workspaces/:workspaceId/_menuDialog/XlsxExportDialog";
import { XlsxImportDialog } from "@/routes/workspaces/:workspaceId/_menuDialog/XlsxImportDialog";
import { ReactNode, createContext, useState } from "react";

export const OperationDialogContext = createContext<{
  isShowXlsxImport: boolean;
  isShowXlsxExport: boolean;
  isShowTransformSave: boolean;
  isShowSetting: boolean;
  openXlsxImport: (a: boolean) => void;
  openXlsxExport: (a: boolean) => void;
  openTransformSave: (a: boolean) => void;
  openSetting: (a: boolean) => void;
}>({
  isShowTransformSave: false,
  isShowXlsxExport: false,
  isShowXlsxImport: false,
  isShowSetting: false,
  openTransformSave: () => {},
  openXlsxExport: () => {},
  openXlsxImport: () => {},
  openSetting: () => {},
});

export function OperationDialogOpenProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isShowTransformSave, openTransformSave] = useState(false);
  const [isShowXlsxExport, openXlsxExport] = useState(false);
  const [isShowXlsxImport, openXlsxImport] = useState(false);
  const [isShowSetting, openSetting] = useState(false);

  return (
    <OperationDialogContext.Provider
      value={{
        isShowTransformSave,
        isShowXlsxExport,
        isShowXlsxImport,
        isShowSetting,
        openTransformSave,
        openXlsxExport,
        openXlsxImport,
        openSetting,
      }}
    >
      <XlsxImportDialog />
      <XlsxExportDialog />
      <TransformSaveDialog />
      <WorkspaceSetting />
      {children}
    </OperationDialogContext.Provider>
  );
}
