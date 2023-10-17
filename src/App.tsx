import { Button } from "@/components/ui/button";
import { Create } from "./create/Create";
import { FormatProvider } from "@/create/format/FormatProvider";

export default function App() {
  return (
    <FormatProvider>
      <Create />
    </FormatProvider>
  );
}
