import { useFormat } from "@/create/format/useFormat";
import { saveAs } from "file-saver";

export function useJson() {
  const { data } = useFormat();

  const makeJson = () => {
    return Object.entries(data).reduce(
      (memo, [key, value]) => {
        memo["ko"][value.key] = value.ko;
        memo["en"][value.key] = value.en;
        memo["cn"][value.key] = value.cn;
        memo["jp"][value.key] = value.jp;
        return memo;
      },
      {
        ko: {} as any,
        en: {} as any,
        cn: {} as any,
        jp: {} as any,
      }
    );
  };
  return {
    makeJson: makeJson,
    downloadJson: (title: string) => {
      const { ko, en, jp, cn } = makeJson();
      var koFile = new File([JSON.stringify(ko)], `${title}_ko.json`, {
        type: "text/plain;charset=utf-8",
      });
      var enFile = new File([JSON.stringify(en)], `${title}_en.json`, {
        type: "text/plain;charset=utf-8",
      });
      var jpFile = new File([JSON.stringify(jp)], `${title}_jp.json`, {
        type: "text/plain;charset=utf-8",
      });
      var cnFile = new File([JSON.stringify(cn)], `${title}_cn.json`, {
        type: "text/plain;charset=utf-8",
      });

      saveAs(koFile);
      saveAs(enFile);
      saveAs(jpFile);
      saveAs(cnFile);
    },
  };
}
