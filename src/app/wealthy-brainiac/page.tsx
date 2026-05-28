import { redirect } from "next/navigation";

/** Legacy brand URL — permanent redirect to Dunrite Global */
export default function LegacyWealthyBrainiacPage() {
  redirect("/dunrite-global");
}
