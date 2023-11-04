export const CODES = {
  SPRING_PROPERTIES: {
    key: "SPRING_PROPERTIES",
    name: "spring-properties",
    makeTransformedCode: (key: string) => `<spring:message code="${key}"/>`,
  },
  TRANSLATE: {
    key: "TRANSLATE",
    name: "next-translate",
    makeTransformedCode: (key: string) => `t('${key}')`,
  },
  IM: {
    key: "IM",
    name: "IM",
    makeTransformedCode: (key: string) => `IM('${key}')`,
  },
} as const;

export type CodeType = (typeof CODES)[keyof typeof CODES];
export type CodeKeyType = keyof typeof CODES;
