import { FormatType } from "@/create/format/FormatType";
import { useState } from "react";

const LOCAL_STORAGE_KEY_PREFIX = "mco_data_download_ls";
const SWITCH_VALUE_KEY = `${LOCAL_STORAGE_KEY_PREFIX}_switch`;
const DATA_KEY = `${LOCAL_STORAGE_KEY_PREFIX}_data_key`;

export function useFormatLocalStorage() {
  const [dataSaveonLocalStorage, setDataSaveOnLocalStorage] = useState(
    localStorage.getItem(SWITCH_VALUE_KEY) === "Y" ? true : false
  );
  const [savedData, setSavedData] = useState<FormatType>(
    JSON.parse(localStorage.getItem(DATA_KEY) ?? "{}")
  );
  return {
    dataSaveOnLocalStorage: dataSaveonLocalStorage,
    setDataSaveOnLocalStorage: (state: boolean) => {
      localStorage.setItem(SWITCH_VALUE_KEY, state ? "Y" : "N");
      setDataSaveOnLocalStorage(state);
    },
    savedData: savedData,
    setSavedData: (format: FormatType) => {
      setSavedData(format);
      dataSaveonLocalStorage &&
        localStorage.setItem(DATA_KEY, JSON.stringify(format));
    },
  };
}
