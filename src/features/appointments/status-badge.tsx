import type { AppointmentStatus } from "@/types/appointment";
import { statusLabels } from "./format";
const styles:Record<AppointmentStatus,string>={pending:"bg-amber-500/12 text-amber-700 dark:text-amber-300",confirmed:"bg-blue-500/12 text-blue-700 dark:text-blue-300",completed:"bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",cancelled:"bg-rose-500/12 text-rose-700 dark:text-rose-300",no_show:"bg-zinc-500/15 text-zinc-700 dark:text-zinc-300"};
export function StatusBadge({status}:{status:AppointmentStatus}){return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>{statusLabels[status]}</span>;}
