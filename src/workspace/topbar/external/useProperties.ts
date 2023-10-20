import { useFormat } from "@/create/format/useFormat";
import { useAppSelector } from "@/index";
import { saveAs } from "file-saver";
import { PropertiesEditor } from "properties-file/editor";

export function useProperties() {
  const workspace = useAppSelector(
    (state) => state.workspaceSlice.currentWorkspace
  );

  const makeProperties = () => {
    const koProperties = new PropertiesEditor("");
    const enProperties = new PropertiesEditor("");
    const jpProperties = new PropertiesEditor("");
    const cnProperties = new PropertiesEditor("");

    workspace?.rows.forEach((value) => {
      console.log(value);
      koProperties.insert(value.langs.key, value.langs.ko ?? "");
      enProperties.insert(value.langs.key, value.langs.en ?? "");
      jpProperties.insert(value.langs.key, value.langs.jp ?? "");
      cnProperties.insert(value.langs.key, value.langs.cn ?? "");
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
