import { CodeKeyType } from "@/language/Codes";
import { LanguageKeyType } from "@/language/Language";
import { ReactNode, createContext, useState } from "react";

export const TranslateCodeTransformLayoutContext = createContext<{
  currentCodeKey: CodeKeyType;
  currentTargetLangKey: LanguageKeyType;
  setCurrentTargetLangKey: (langKey: LanguageKeyType) => void;
  setCurrentCodeKey: (codeKeyType: CodeKeyType) => void;
}>({
  currentCodeKey: "IM",
  setCurrentCodeKey: (codeKeyType: CodeKeyType) => {},
  currentTargetLangKey: "KO",
  setCurrentTargetLangKey: (langKey: LanguageKeyType) => {},
});

export function TranslateCodeTransrformProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [codekey, setCodeKey] = useState<CodeKeyType>("IM");
  const [langKey, setLangKey] = useState<LanguageKeyType>("KO");

  return (
    <TranslateCodeTransformLayoutContext.Provider
      value={{
        currentCodeKey: codekey,
        setCurrentCodeKey: setCodeKey,
        currentTargetLangKey: langKey,
        setCurrentTargetLangKey: setLangKey,
      }}
    >
      {children}
    </TranslateCodeTransformLayoutContext.Provider>
  );
}
