import { FormatType } from "@/create/format/FormatType";
import { useFormatLocalStorage } from "@/create/format/useFormatLocalStorage";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const FormatContext = createContext<{
  data: FormatType;
  setData: Dispatch<SetStateAction<FormatType>>;
}>({
  data: null as any,
  setData: null as any,
});

export function FormatProvider({ children }: { children: ReactNode }) {
  const { savedData } = useFormatLocalStorage();
  const [data, setData] = useState(savedData);

  return (
    <FormatContext.Provider
      value={{
        data: data,
        setData: setData,
      }}
      children={children}
    />
  );
}
