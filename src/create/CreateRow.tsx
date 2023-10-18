import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useFormat } from "@/create/format/useFormat";
import { useDeferredValue, useState } from "react";

export function CreateRow({ idKey }: { idKey: string }) {
  const { data, saveFormat } = useFormat();
  const [dKey, setKey] = useState(data[idKey].key ?? "");
  const [dKo, setKo] = useState(data[idKey]?.ko ?? "");
  const [dEn, setEn] = useState(data[idKey]?.en ?? "");
  const [dJp, setJp] = useState(data[idKey]?.jp ?? "");
  const [dCn, setCn] = useState(data[idKey]?.cn ?? "");
  const key = dKey;
  const ko = dKo;
  const en = dEn;
  const jp = dJp;
  const cn = dCn;

  return (
    <TableRow>
      <TableCell>
        <Textarea
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            saveFormat(idKey, {
              key: e.target.value,
              ko,
              en,
              jp,
              cn,
            });
          }}
        />
      </TableCell>
      <TableCell>
        <Textarea
          value={dKo}
          onChange={(e) => {
            setKo(e.target.value);
            saveFormat(idKey, {
              key,
              ko: e.target.value,
              en,
              jp,
              cn,
            });
          }}
        />
      </TableCell>
      <TableCell>
        <Textarea
          value={dEn}
          onChange={(e) => {
            setEn(e.target.value);
            saveFormat(idKey, {
              key,
              ko,
              en: e.target.value,
              jp,
              cn,
            });
          }}
        />
      </TableCell>
      <TableCell>
        <Textarea
          value={dJp}
          onChange={(e) => {
            setJp(e.target.value);
            saveFormat(idKey, {
              key,
              ko,
              en,
              jp: e.target.value,
              cn,
            });
          }}
        />
      </TableCell>
      <TableCell>
        <Textarea
          value={dCn}
          onChange={(e) => {
            setCn(e.target.value);
            saveFormat(idKey, {
              key,
              ko,
              en,
              jp,
              cn: e.target.value,
            });
          }}
        />
      </TableCell>
    </TableRow>
  );
}
