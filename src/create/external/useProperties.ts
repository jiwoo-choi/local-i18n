import { useFormat } from "@/create/format/useFormat";
import { saveAs } from "file-saver";
import { PropertiesEditor } from "properties-file/editor";

export function useProperties() {
  const { data } = useFormat();
  const makeProperties = () => {
    const koProperties = new PropertiesEditor("");
    const enProperties = new PropertiesEditor("");
    const jpProperties = new PropertiesEditor("");
    const cnProperties = new PropertiesEditor("");

    Object.entries(data).forEach(([key, value]) => {
      koProperties.insert(value.key, value.ko);
      enProperties.insert(value.key, value.en);
      jpProperties.insert(value.key, value.jp);
      cnProperties.insert(value.key, value.cn);
    });
    return {
      ko: koProperties,
      en: enProperties,
      jp: jpProperties,
      cn: cnProperties,
    };
  };

  return {
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
