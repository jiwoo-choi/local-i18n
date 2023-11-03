import { useAppSelector } from "@/index";
import {
  findByWorkspaceIdSelector,
  rowNormalizerSelectors,
} from "@/workspaces/@data/workspaceSelectors";
import { rowNormalizer } from "@/workspaces/@data/workspaceSlice";
import { EntityId } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";
import { PropertiesEditor } from "properties-file/editor";
export function useProperties(workspaceEntityId: EntityId) {
  const workspace = useAppSelector(
    findByWorkspaceIdSelector(workspaceEntityId)
  );
  const rowEntities = workspace?.rows ?? rowNormalizer.getInitialState();
  const rows = rowNormalizerSelectors.selectAll(rowEntities);

  const makeProperties = () => {
    const koProperties = new PropertiesEditor("");
    const enProperties = new PropertiesEditor("");
    const jpProperties = new PropertiesEditor("");
    const cnProperties = new PropertiesEditor("");

    rows?.forEach((value) => {
      koProperties.insert(value.key, value.langs["KO"] ?? "");
      enProperties.insert(value.key, value.langs["EN"] ?? "");
      jpProperties.insert(value.key, value.langs["JP"] ?? "");
      cnProperties.insert(value.key, value.langs["CN"] ?? "");
    });
    return {
      ko: koProperties,
      en: enProperties,
      jp: jpProperties,
      cn: cnProperties,
    };
  };

  return {
    importProperties: () => {},
    makeProperties: makeProperties,
    downloadProperties: (title: string) => {
      const { ko, en, jp, cn } = makeProperties();
      var koFile = new File([ko.format("\n")], `${title}_ko.properties`, {
        type: "text/plain;charset=utf-8",
      });
      var enFile = new File([en.format("\n")], `${title}_en.properties`, {
        type: "text/plain;charset=utf-8",
      });
      var jpFile = new File([jp.format("\n")], `${title}_jp.properties`, {
        type: "text/plain;charset=utf-8",
      });
      var cnFile = new File([cn.format("\n")], `${title}_cn.properties`, {
        type: "text/plain;charset=utf-8",
      });

      saveAs(koFile);
      saveAs(enFile);
      saveAs(jpFile);
      saveAs(cnFile);
    },
  };
}
