const generateDicLink = (langUrlKey: string, query: string) =>
  `https://${langUrlKey}.dict.naver.com/#/search?query=${query}`;

export const LANGUAGES = {
  KO: {
    key: "KO",
    name: "한국어",
    sort: 0,
    makeDicLink: (query: string) => generateDicLink("ko", query),
  },
  EN: {
    key: "EN",
    name: "영어",
    sort: 1,
    makeDicLink: (query: string) => generateDicLink("en", query),
  },
  CN: {
    key: "CN",
    name: "중국어",
    sort: 2,
    makeDicLink: (query: string) => generateDicLink("zh", query),
  },
  JP: {
    key: "JP",
    name: "일본어",
    sort: 3,
    makeDicLink: (query: string) => generateDicLink("ja", query),
  },
} as const;

export type LanguageType = (typeof LANGUAGES)[keyof typeof LANGUAGES];
export type LanguageKeyType = keyof typeof LANGUAGES;
