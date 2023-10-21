export const LANGUAGES = {
  KO: {
    key: "KO",
    name: "한국어",
    sort: 0,
    dicLink: "https://ko.dict.naver.com/#/search?query={{query}}",
  },
  EN: {
    key: "EN",
    name: "영어",
    sort: 1,
    dicLink: "https://en.dict.naver.com/#/search?query={{query}}",
  },
  CN: {
    key: "CN",
    name: "중국어",
    sort: 2,
    dicLink: "https://zh.dict.naver.com/#/search?query={{query}}",
  },
  JP: {
    key: "JP",
    name: "일본어",
    sort: 3,
    dicLink: "https://ja.dict.naver.com/#/search?query={{query}}",
  },
} as const;

export type LanguageType = (typeof LANGUAGES)[keyof typeof LANGUAGES];
export type LanguageKeyType = keyof typeof LANGUAGES;
