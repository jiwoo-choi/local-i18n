import { FormatContext } from "@/create/format/FormatProvider";
import { FormatType } from "@/create/format/FormatType";
import { useFormatLocalStorage } from "@/create/format/useFormatLocalStorage";
import { useContext, useMemo } from "react";

export function useFormat() {
  const { setSavedData, dataSaveOnLocalStorage } = useFormatLocalStorage();
  const { data, setData } = useContext(FormatContext);
  const keyList = useMemo(() => {
    return Object.keys(data);
  }, [data]);
  return {
    data,
    keyList,
    saveFormat: (idKey: string, formatValueType: FormatType[string]) => {
      setData({ ...data, [idKey]: formatValueType });
      dataSaveOnLocalStorage &&
        setSavedData({ ...data, [idKey]: formatValueType });
    },
    clearAll: () => {
      setData({});
      dataSaveOnLocalStorage && setSavedData({});
    },
    setData: (formatType: FormatType) => {
      setData(formatType);
      dataSaveOnLocalStorage && setSavedData({ ...formatType });
    },
  };
}
