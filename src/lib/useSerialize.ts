import { RowType } from "@/globalDataSlice";
import Ajv, { JTDSchemaType } from "ajv/dist/jtd";
import { useMemo } from "react";
const ajv = new Ajv();
const schema: JTDSchemaType<Omit<RowType, "id">[]> = {
  elements: {
    properties: {
      key: {
        type: "string",
      },
      langs: {
        optionalProperties: {
          CN: {
            type: "string",
          },
          EN: {
            type: "string",
          },
          JP: {
            type: "string",
          },
          KO: {
            type: "string",
          },
        },
      },
    },
  },
};

const serailze = ajv.compileSerializer(schema);

function useSerialize(rowsWithoutId: Omit<RowType, "id">[]): string {
  return useMemo(() => {
    return serailze(rowsWithoutId);
  }, [rowsWithoutId]);
}
// "JP":"AA가 포함된다면.."

function useDeserialize(rowsWithoutId: string) {
  return JSON.parse(rowsWithoutId);
}

function useTest() {}
